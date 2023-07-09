const { connectRabbitMQ } = require('../utils/ConnectRabbitMQ');
const { emptyQueue } = require('../utils/EmptyQueue');

module.exports = {
  startDownloadAndProcessIndexFiles: async function (req, res) {
    try {
      let Channel;
      let queueName;
      let Connection;
      const { indexFiles: indexFileUrls } = req.body;

      try {
        await emptyQueue();
      } catch (error) {
        throw error;
      }

      try {
        const { channel, QUEUE_NAME, connection } = await connectRabbitMQ();
        Channel = channel;
        queueName = QUEUE_NAME;
        Connection = connection;
      } catch (error) {
        throw error;
      }

      for (const url of indexFileUrls) {
        const message = JSON.stringify({ url });
        Channel.sendToQueue(queueName, Buffer.from(message));
      }

      try {
        await Channel.close();
      } catch (error) {
        throw error;
      }

      try {
        await Connection.close();
      } catch (error) {
        throw error;
      }
      return res.ok('ok!');
    } catch (error) {
      return res.serverError(error);
    }
  },
};
