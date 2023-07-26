const { cleanDB } = require('../utils/CleanDBUtils');
const { connectRabbitMQ } = require('../utils/ConnectRabbitMQUtils');
const { emptyQueue } = require('../utils/EmptyQueueUtils');
const {
  fetchIndexFilesFromDBUtils,
} = require('../utils/FetchIndexFilesFromDBUtils');
const { pushDataToQueue } = require('../utils/PushDataToQueue');
const { startWorker } = require('../workers/DownloadAndProcessWorker');

module.exports = {
  startDownloadAndProcessIndexFiles: async function (req, res) {
    try {
      const { skip, limit, sort } = req.query;

      const indexFileUrls = await fetchIndexFilesFromDBUtils({ skip, limit, sort });

      if (indexFileUrls.length === 0) {
        return res.notFound('Before proceeding, execute the initial endpoint to obtain a response from it');
      }

      await emptyQueue();
      await cleanDB(APIsDefinitionsModel);

      const { channel, QUEUE_NAME, connection } = await connectRabbitMQ();
      pushDataToQueue(indexFileUrls, QUEUE_NAME, channel);

      await channel.close();
      await connection.close();

      startWorker();

      return res
        .status(202)
        .json({ message: 'Downloading has been started in background.' });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
