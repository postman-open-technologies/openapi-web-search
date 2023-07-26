const { CC_SERVER_URL } = require('../constants/Constants');
const {
  retrieveDirectoriesUrlsFromCCServer,
} = require('../utils/CommonCrawlDriverUtils');
const {
  processDataWithExponentialRetry,
} = require('../utils/ProcessDataWithExponentialRetryUtils');

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
      const crawledDirectories = await retrieveDirectoriesUrlsFromCCServer(
        CC_SERVER_URL,
        latest
      );

      const indexFiles = processDataWithExponentialRetry(crawledDirectories);
      return indexFiles;
    } catch (error) {
      throw error;
    }
  },
};
