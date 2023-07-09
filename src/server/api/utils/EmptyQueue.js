const { connectRabbitMQ } = require('./ConnectRabbitMQ');

module.exports = {
  emptyQueue: async function () {
    try {
      let Channel;
      let queueName;
      let Connection;

      try {
        const { channel, QUEUE_NAME, connection } = await connectRabbitMQ();
        Channel = channel;
        queueName = QUEUE_NAME;
        Connection = connection;
      }
      catch(error) {
        throw error;
      }

      try {
        await Channel.deleteQueue(queueName);
      } catch(error) {
        throw error;
      }

      console.log('\n\nQueue emptied.\n');

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
    } catch (error) {
      throw error;
    }
  },
};
