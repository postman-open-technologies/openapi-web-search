const { CC_SERVER_URL } = require('../constants/Constants');
const {
  retrieveDirectoriesUrlsFromCCServer,
} = require('../utils/CommonCrawlDriverUtil');
const {
  processDataWithExponentialRetry,
} = require('../utils/ProcessDataWithExponentialRetry');
const {
  downloadAndProcessIndexFilesInBackground,
} = require('../utils/DownloadAndProcessIndexFiles');

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
      let indexFiles;

      try {
        crawledDirectories = await retrieveDirectoriesUrlsFromCCServer(
          CC_SERVER_URL,
          latest
        );
      } catch (error) {
        throw error;
      }

      try {
        indexFiles = await processDataWithExponentialRetry(crawledDirectories);
      } catch (error) {
        throw error;
      }

      try {
        // Right now, there are two main problem with that function, First is I cannot able use parallel processing functionality using nodejs clusters because of that I cannot able to maximize the utilization of nodejs. And second one is How? I have got 503 error from CC server it is not reproducible, I have got that randomly.
        /**
         * TODO'S
         * [] Implement parallel processing using clusters.
         * [] Fix 503 error
         */
        await downloadAndProcessIndexFilesInBackground(indexFiles);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  },
};
