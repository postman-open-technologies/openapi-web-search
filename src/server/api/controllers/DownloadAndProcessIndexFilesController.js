const { cleanDB } = require('../utils/DBUtils');
const { emptyQueue, pushDataToQueue } = require('../utils/QueueUtils');
const { connectRabbitMQ } = require('../utils/ConnectRabbitMQUtils');
const {
  fetchIndexFilesFromDBUtils,
} = require('../utils/DBUtils');
const { startWorker } = require('../workers/DownloadAndProcessWorker');
const { removeDist } = require('../utils/FileHandlingUtils');

module.exports = {
  /**
   * Asynchronously starts the download and processing of index files.
   *
   * @async
   * @function startDownloadAndProcessIndexFiles
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void} return a 202 Accepted response status code indicates that the request has been accepted for processing, but the processing has not been completed.
   * @throws {Error} If there is an error during the process, it will be thrown.
   * @example
   * Query parameter example:
   * /api/v1/download/process/index-files?skip=0&limit=3&sort=aes
   *
  */
  startDownloadAndProcessIndexFiles: async function (req, res) {
    try {
      const { skip, limit, sort } = req.query;

      // Fetch index file URLs from the database utility function
      const indexFileUrls = await fetchIndexFilesFromDBUtils({ skip, limit, sort });

      if (indexFileUrls.length === 0) {
        return res.badRequest('Before proceeding, execute the initial endpoint to obtain a response from it');
      }


      // Empty the queue and clean the database for storing latest data
      await emptyQueue();
      await cleanDB(APIsDefinitionsModel);
      removeDist();

      const { channel, QUEUE_NAME, connection } = await connectRabbitMQ();

      pushDataToQueue(indexFileUrls, QUEUE_NAME, channel);


      // Start the worker to process the downloaded files
      await startWorker();

      await channel.close();
      await connection.close();

      return res
        .status(202)
        .json({ message: 'Downloading has been started in background.' });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
