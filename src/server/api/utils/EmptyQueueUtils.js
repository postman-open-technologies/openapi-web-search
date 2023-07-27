const { connectRabbitMQ } = require('./ConnectRabbitMQUtils');

module.exports = {
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
};
