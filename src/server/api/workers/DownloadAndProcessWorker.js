const { connectRabbitMQ } = require('../utils/ConnectRabbitMQUtils');
const { consumeMessagesFromQueue } = require('../utils/QueueUtils');

module.exports = {
  /**
   * Asynchronously starts the worker to process jobs from the RabbitMQ queue.
   *
   * @function startWorker
   * @throws {Error} If there is an error during the worker startup or job processing, it will be thrown.
 */
  startWorker: async function () {
    try {
      const { channel, QUEUE_NAME } = await connectRabbitMQ();

      // Configure the channel to process one message at a time
      channel.prefetch(1);
      console.log(`[*] Waiting for messages in ${QUEUE_NAME}. To exit press CTRL+C`);

      // Consume messages from the queue and process jobs
      await consumeMessagesFromQueue(channel,QUEUE_NAME);
    } catch (error) {
      throw error;
    }
  },
};
