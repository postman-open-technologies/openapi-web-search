const { backOff } = require('exponential-backoff');
const { retrieveIndexFilesUrlsFromDirs } = require('./CommonCrawlDriverUtil');

module.exports = {
  /**
   * Perform exponential backoff retry for retrieving index file URLs from directories.
   *
   * @async
   * @param {Array} crawledDirectories - The array of directories to retrieve index file URLs from.
   * @returns {<Array<string>>} retrieved index file URLs.
   * @throws {Error} If an error occurs during the execution.
   */
  processDataWithExponentialRetry: async function (crawledDirectories) {
    try {
      let resolvedInnerResults;
      let innerResults;

      const backOffResults = await Promise.all(
        crawledDirectories.map(async (r) => {
          try {
            innerResults = await backOff(
              () => retrieveIndexFilesUrlsFromDirs(r),
              {
                timeMultiple: 2,
                maxDelay: 1000,
                numOfAttempts: 10,
                delayFirstAttempt: false,
                jitter: 'none',

                retry: (error, numOfAttempts) => {
                  console.error(error.message);
                  console.log('Number of attempt:', numOfAttempts);
                  return true;
                },
              }
            );

            try {
              resolvedInnerResults = await Promise.all(innerResults);
            } catch (error) {
              throw error;
            }

            return resolvedInnerResults;
          } catch (error) {
            throw error;
          }
        })
      );

      return backOffResults.flat();
    } catch (error) {
      throw error;
    }
  },
};
