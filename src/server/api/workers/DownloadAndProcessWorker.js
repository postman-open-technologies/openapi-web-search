const { QUEUE_NAME } = require('../constants/Constants');
const { connectRabbitMQ } = require('../utils/ConnectRabbitMQUtils');
const { processJob } = require('../utils/ProcessJobUtils');

module.exports = {
  startWorker: async function () {
    try {
      let Channel;
      let queueName;

      try {
        const { channel, QUEUE_NAME } = await connectRabbitMQ();
        Channel = channel;
        queueName = QUEUE_NAME;
      } catch (error) {
        throw error;
      }

      Channel.prefetch(1);
      console.log(`[*] Waiting for messages in ${QUEUE_NAME}. To exit press CTRL+C`);

      Channel.consume(queueName, async (message) => {

        if (!message) {
          Channel.reject(message, true);
        }

        const job = JSON.parse(message.content.toString());
        sails.config.globals.isProcessing = true;

        try {
          await processJob(job, Channel, message);
        } catch (error) {
          console.error(error.message);
          Channel.nack(message, false, true);
        }

      });
    } catch (error) {
      throw error;
    }
  },
};
