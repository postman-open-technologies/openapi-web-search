const { processJob } = require('./ProcessJobUtils');

module.exports = {
  /**
   * Asynchronously consumes messages from a RabbitMQ queue and processes jobs.
   *
   * @function consumeMessagesFromQueue
   * @param {Object} channel - The RabbitMQ channel to consume messages from.
   * @param {string} QUEUE_NAME - The name of the queue to consume messages from.
   * @throws {Error} If there is an error during message consumption or job processing, it will be thrown.
 */
  consumeMessagesFromQueue: async function (channel, QUEUE_NAME) {
    channel.consume(QUEUE_NAME, async (message) => {
      if (!message) {
        channel.reject(message, true);
      }

      // Parse the job from the message content
      const job = JSON.parse(message.content.toString());

      try {
        await processJob(job, channel, message);
      } catch (error) {
        console.error(error.message);
        // requeue the message in case of any error
        channel.nack(message, false, true);
      }
    });
  },
};
