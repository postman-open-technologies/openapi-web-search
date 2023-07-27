const { cleanDB } = require('../utils/CleanDBUtils');
const { connectRabbitMQ } = require('../utils/ConnectRabbitMQUtils');
const { emptyQueue } = require('../utils/EmptyQueueUtils');
const {
  fetchIndexFilesFromDBUtils,
} = require('../utils/FetchIndexFilesFromDBUtils');
const { pushDataToQueue } = require('../utils/PushDataToQueue');
const { startWorker } = require('../workers/DownloadAndProcessWorker');

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
 */
  startDownloadAndProcessIndexFiles: async function (req, res) {
    try {
      const { skip, limit, sort } = req.query;

      // Fetch index file URLs from the database utility function
      const indexFileUrls = await fetchIndexFilesFromDBUtils({ skip, limit, sort });

      if (indexFileUrls.length === 0) {
        return res.notFound('Before proceeding, execute the initial endpoint to obtain a response from it');
      }

      // Empty the queue and clean the database for storing latest data
      await emptyQueue();
      await cleanDB(APIsDefinitionsModel);

      const { channel, QUEUE_NAME, connection } = await connectRabbitMQ();
      pushDataToQueue(indexFileUrls, QUEUE_NAME, channel);

      await channel.close();
      await connection.close();

      // Start the worker to process the downloaded files
      await startWorker();

      return res
        .status(202)
        .json({ message: 'Downloading has been started in background.' });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
