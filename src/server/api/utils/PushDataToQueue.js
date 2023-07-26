module.exports = {
  pushDataToQueue: function (indexFileUrls, queueName, Channel) {
    for (let i = 0; i < indexFileUrls.length; i++) {
      const message = JSON.stringify({ url: indexFileUrls[i].URL });
      Channel.sendToQueue(queueName, Buffer.from(message),{
        persistent: true
      });
    }
  },
};
