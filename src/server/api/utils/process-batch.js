const {
  retrieveUrlsForIndexFiles,
} = require('./common-crawl-driver-util');
module.exports = {
  processBatch: async function (batch) {
    const batchPromises = batch.map(async (r) => {
      const urls = await retrieveUrlsForIndexFiles(r);
      return urls;
    });

    const batchResults = await Promise.all(batchPromises);
    return batchResults;
  },
};
