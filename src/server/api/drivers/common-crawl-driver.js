const {
  URL,
  INDEX_FILES_BATCH_SIZE,
  DELAY,
} = require('../constants/constants');
const {
  retrieveIndexUrlsFromCCServer
} = require('../utils/common-crawl-driver-util');
const {processBatch} = require('../utils/process-batch');
const ccFilesPromises = [];

module.exports = {
  retrieveDefinations: async function () {
    try {
      const crawledFiles = await retrieveIndexUrlsFromCCServer(URL);


      // Implement a batch processing mechanism to retrieve URLs of index files
      // from directories obtained by scraping the Common Crawl server.
      for (let i = 0; i < crawledFiles.length; i += INDEX_FILES_BATCH_SIZE) {
        const remainingFiles = crawledFiles.length - i;
        const batch = crawledFiles.slice(
          i,
          i + Math.min(INDEX_FILES_BATCH_SIZE, remainingFiles)
        );
        const batchPromise = processBatch(batch);

        ccFilesPromises.push(batchPromise);

        if (i + INDEX_FILES_BATCH_SIZE < crawledFiles.length) {
          await new Promise((resolve) => setTimeout(resolve, DELAY));
        }
      }



      const ccFilesResults = await Promise.all(ccFilesPromises);
      const flattedResult = ccFilesResults.flat();
      console.log('Flatten results: ',flattedResult);
    } catch (error) {
      console.error(error);
    }
  },
};
