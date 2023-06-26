const { retrieveIndexFilesUrlsFromDirs } = require('./CommonCrawlDriverUtil');

module.exports = {
  /**
   * Processes a batch of directories and retrieves the corresponding index file URLs for each directory.
   *
   * @param {Array<string>} batch - An array of directories to process in the batch.
   * @returns {Array<Array<string>>} A promise that resolves to an array of arrays of index file URLs for each directory.
   * @throws {Error} If an error occurs during the processing or retrieval of URLs.
   */
  processBatch: async function (batch) {
    try {
      let urls;
      let batchResults;

      const batchPromises = batch.map(async (dir) => {

        try {
          urls = await retrieveIndexFilesUrlsFromDirs(dir);
        } catch (error) {
          throw error;
        }

        return urls;
      });

      try {
        batchResults = await Promise.all(batchPromises);
      }
      catch(error) {
        throw error;
      }
      return batchResults;
    } catch (error) {
      throw error;
    }
  },
};
