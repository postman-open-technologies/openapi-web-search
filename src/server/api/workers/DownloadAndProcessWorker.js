const { connectRabbitMQ } = require('../utils/ConnectRabbitMQ');
const { processJob } = require('../utils/ProcessJob');

module.exports = {
  startWorker: async function () {
    try {
      let Channel;
      let queueName;

      try {
        const { channel, QUEUE_NAME, connection } = await connectRabbitMQ();
        Channel = channel;
        queueName = QUEUE_NAME;
        Connection = connection;
      } catch (error) {
        throw error;
      }

      let isProcessing = false;

      Channel.consume(queueName, async (message) => {
        if (!message || isProcessing) {
          // Check if message is null or if another job is already being processed
          if (message) {
            Channel.reject(message, true);
          }
          return;
        }

        const job = JSON.parse(message.content.toString());

        isProcessing = true;

        try {
          await processJob(job);
          Channel.ack(message);
        } catch (error) {
          console.error('An error occurred:', error);
          Channel.reject(message, true);
        } finally {
          isProcessing = false;
        }
      });
    } catch (error) {
      throw error;
    }
  },
};
