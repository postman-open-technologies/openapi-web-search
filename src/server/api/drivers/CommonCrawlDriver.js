const {
  URL,
  DIRECTORIES_BATCH_SIZE,
  DELAY,
} = require('../constants/Constants');
const {
  retrieveUrlsDirectoriesFromCCServer,
} = require('../utils/CommonCrawlDriverUtil');
const { flattenCCFilesResults } = require('../utils/FlattenCCFilesResults');
const { processDirectoriesInBatches } = require('../utils/ProcessDirectoriesInBatches');

module.exports = {
  retrieveDefinitionsFromCC: async function (historicalData) {
    try {
      const crawledDirectories = await retrieveUrlsDirectoriesFromCCServer(
        URL,
        historicalData
      );
      /**
      * Implement a batch processing mechanism to retrieve URLs for index files
      * from directories obtained by scraping the Common Crawl server.
      * Process the crawled directories in batches, adding them to the ccFilesPromises array for asynchronous processing.
      * Each batch contains a subset of directories from the crawledDirectories array.
      * If there are remaining directories after processing a batch, a delay is introduced before processing the next batch.
      */
      const ccFilesResults = await processDirectoriesInBatches(crawledDirectories,DIRECTORIES_BATCH_SIZE,DELAY);
      /**
       * Flattens a 3D array of ccFilesResults into a 1D array using the reduce method.
       * The resulting array will contain all the elements from the nested arrays.
       *
       * @param {Array} ccFilesResults - The 3D array of ccFilesResults to be flattened.
       * @returns {Array} - The flattened 1D array of ccFilesResults.
       */
      const flattedResult = flattenCCFilesResults(ccFilesResults);
      return flattedResult;
    } catch (error) {
      throw new Error(error);
    }
  },
};
