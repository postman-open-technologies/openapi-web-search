module.exports = {
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
  },
};
