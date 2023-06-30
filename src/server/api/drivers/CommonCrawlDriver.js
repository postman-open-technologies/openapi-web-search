const {
  CC_SERVER_URL
} = require('../constants/Constants');
const {
  retrieveDirectoriesUrlsFromCCServer,
} = require('../utils/CommonCrawlDriverUtil');
const {processDirectoriesWithExponentialRetry} = require('../utils/processDirectoriesWithExponentialRetry');

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
          CC_SERVER_URL,
          latest
        );
      } catch (error) {
        throw error;
      }

      const indexFiles = await processDirectoriesWithExponentialRetry(crawledDirectories);

      return indexFiles;
    } catch (error) {
      throw error;
    }
  },
};
