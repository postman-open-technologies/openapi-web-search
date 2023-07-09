const amqp = require('amqplib');

const { QUEUE_NAME, RABBITMQ_URL } = require('../constants/Constants');

module.exports = {
  connectRabbitMQ: async function () {
    try {
      let connection;
      let channel;

      try {
        connection = await amqp.connect(RABBITMQ_URL);
      } catch (error) {
        throw error;
      }

      try {
        channel = await connection.createChannel();
      } catch (error) {
        throw error;
      }

      try {
        await channel.assertQueue(QUEUE_NAME);
      } catch (error) {
        throw error;
      }

      return { channel, QUEUE_NAME, connection };
    } catch (error) {
      throw error;
    }
  },
};
