const { connectRabbitMQ } = require('./ConnectRabbitMQUtils');
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

  /**
   * Asynchronously empties the RabbitMQ queue by deleting all its contents.
   *
   * @function emptyQueue
   * @throws {Error} If there is an error during the queue emptying process, it will be thrown.
 */
  emptyQueue: async function () {
    try {
      const { channel, QUEUE_NAME, connection } = await connectRabbitMQ();

      await channel.deleteQueue(QUEUE_NAME);
      console.log('\n\nQueue emptied.\n');

      await channel.close();
      await connection.close();
    } catch (error) {
      throw error;
    }
  },

  /**
   * Pushes data (index file URLs) to a RabbitMQ queue using the specified channel.
   *
   * @function pushDataToQueue
   * @param {Array<Object>} indexFileUrls - An array of objects containing index file URLs to be pushed to the queue.
   * @param {string} queueName - The name of the RabbitMQ queue to which data will be pushed.
   * @param {Object} Channel - The RabbitMQ channel used for communication.
 */
  pushDataToQueue: function (indexFileUrls, queueName, Channel) {
    for (let i = 0; i < indexFileUrls.length; i++) {
      const message = JSON.stringify({ url: indexFileUrls[i].URL });
      Channel.sendToQueue(queueName, Buffer.from(message),{
        persistent: true
      });
    }
  }
}
