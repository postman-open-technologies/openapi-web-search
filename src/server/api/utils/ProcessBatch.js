const {
  retrieveIndexFilesUrlsFromDirs,
} = require('./CommonCrawlDriverUtil');
module.exports = {
  processBatch: async function (batch) {
    try {
      const batchPromises = batch.map(async (dir) => {
        const urls = await retrieveIndexFilesUrlsFromDirs(dir);
        return urls;
      });

      const batchResults = await Promise.all(batchPromises);
      return batchResults;
    }
    catch(error) {
      throw new Error(error);
    }
  },
};
