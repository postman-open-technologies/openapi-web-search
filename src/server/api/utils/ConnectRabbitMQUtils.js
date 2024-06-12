const amqp = require('amqplib');
const { QUEUE_NAME, RABBIT_MQ_URL } = require('../constants/Constants');

module.exports = {
  /**
   * Asynchronously connects to RabbitMQ and creates a channel for communication.
   *
   * @function connectRabbitMQ
   * @returns {Promise<Object>} A Promise that resolves with an object containing the RabbitMQ channel, queue name, and connection.
   * @throws {Error} If there is an error during the RabbitMQ connection or channel creation, it will be thrown.
 */
  connectRabbitMQ: async function () {
    try {
      const connection = await amqp.connect(RABBIT_MQ_URL);
      const channel = await connection.createChannel();

      // Assert the queue with durable set to true. Assert Queue mean: refers to declaring a queue in the messaging broker if it does not already exist. If the queue already exists, the assertion process verifies the queue properties to ensure they match the specified properties.
      await channel.assertQueue(QUEUE_NAME,{
        durable: true
      });

      return { channel, QUEUE_NAME, connection };
    } catch (error) {
      throw error;
    }
  },
};
