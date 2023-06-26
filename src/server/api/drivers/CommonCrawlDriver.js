const {
  URL,
  DIRECTORIES_BATCH_SIZE,
  DELAY,
} = require('../constants/Constants');
const {
  retrieveDirectoriesUrlsFromCCServer,
} = require('../utils/CommonCrawlDriverUtil');
const {ExponentialBackOff} = require('../utils/ExponentialBackOff');
const { flattenCCFilesResults } = require('../utils/FlattenCCFilesResults');
const {
  processDirectoriesInBatches,
} = require('../utils/ProcessDirectoriesInBatches');

module.exports = {
  /**
   * Retrieves API definitions from Common Crawl by performing the following steps:
   * 1. Retrieve URLs for directories from the Common Crawl server.
   * 2. Process the crawled directories in batches, asynchronously retrieving URLs for index files.
   * 3. Flatten the resulting 3D array of API definitions into a 1D array.
   *
   * @param {boolean} latest - Indicates whether to retrieve the latest data from Common Crawl.
   * @returns {Array<string>} The flattened 1D array of ccIndexDirsUrls.
   * @throws {Error} If an error occurs during the retrieval process.
   */
  retrieveDefinitionsFromCC: async function (latest) {
    try {
      let crawledDirectories;

      try {
        crawledDirectories = await retrieveDirectoriesUrlsFromCCServer(
          URL,
          latest
        );
      } catch (error) {
        throw error;
      }

      return await ExponentialBackOff(crawledDirectories);
    } catch (error) {
      throw error;
    }
  },
};
