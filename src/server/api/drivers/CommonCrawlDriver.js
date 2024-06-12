const { CC_SERVER_URL } = require('../constants/Constants');
const {
  retrieveDirectoriesUrlsFromCCServer,
} = require('../utils/CommonCrawlDriverUtils');
const {
  processDataWithExponentialRetry,
} = require('../utils/ProcessDataWithExponentialRetryUtils');

module.exports = {
 /**
 * Retrieves definitions from the CC server.
 *
 * @function retrieveDefinitionsFromCC
 * @param {boolean} latest - Whether to retrieve the latest definitions or not.
 * @returns {Array} returning an array of index file URLs.
 * @throws {Error} If there is an error during the retrieval process, it will be thrown.
 */
  retrieveDefinitionsFromCC: async function (latest) {
    try {
      const crawledDirectories = await retrieveDirectoriesUrlsFromCCServer(
        CC_SERVER_URL,
        latest
      );

      const indexFiles = await processDataWithExponentialRetry(crawledDirectories);
      return indexFiles;
    } catch (error) {
      throw error;
    }
  },
};
