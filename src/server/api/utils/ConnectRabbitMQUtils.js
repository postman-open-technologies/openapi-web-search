const amqp = require('amqplib');

const { QUEUE_NAME, RABBIT_MQ_URL } = require('../constants/Constants');

module.exports = {
  connectRabbitMQ: async function () {
    try {
      const connection = await amqp.connect(RABBIT_MQ_URL);
      const channel = await connection.createChannel();

      await channel.assertQueue(QUEUE_NAME,{
        durable: true
      });

      return { channel, QUEUE_NAME, connection };
    } catch (error) {
      throw error;
    }
  },
};
