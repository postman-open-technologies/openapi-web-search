const { processBatch } = require('./ProcessBatch');

module.exports = {
  /**
   * Processes crawled directories in batches and retrieves index file URLs for each batch.
   *
   * @param {Array<string>} crawledDirectories - An array of crawled directories to process.
   * @param {number} DIRECTORIES_BATCH_SIZE - The size of each batch.
   * @param {number} DELAY - The delay (in milliseconds) between processing each batch.
   * @returns {Array<Array<Array<string>>>} A promise that resolves to an array of arrays of index file URLs for each batch.
   * @throws {Error} If an error occurs during the processing or retrieval of URLs.
   */
  processDirectoriesInBatches: async function (
    crawledDirectories,
    DIRECTORIES_BATCH_SIZE,
    DELAY
  ) {
    try {
      const ccFilesPromises = [];

      for (
        let dir = 0;
        dir < crawledDirectories.length;
        dir += DIRECTORIES_BATCH_SIZE
      ) {
        const remainingFiles = crawledDirectories.length - dir;

        const batch = crawledDirectories.slice(
          dir,
          dir + Math.min(DIRECTORIES_BATCH_SIZE, remainingFiles)
        );

        const batchPromise = await processBatch(batch);
        ccFilesPromises.push(batchPromise);

        if (dir + DIRECTORIES_BATCH_SIZE < crawledDirectories.length) {

          try {
            await new Promise((resolve) => setTimeout(resolve, DELAY));
          } catch (error) {
            throw error;
          }

        }
      }

      try {
        return await Promise.all(ccFilesPromises);
      }
      catch(error) {
        throw error;
      }

    } catch (error) {
      throw error;
    }
  },
};
