const { connectRabbitMQ } = require('./ConnectRabbitMQUtils');

module.exports = {
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
