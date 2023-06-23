const { processBatch } = require('./ProcessBatch');

module.exports = {
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
        const batchPromise = processBatch(batch);

        ccFilesPromises.push(batchPromise);

        if (dir + DIRECTORIES_BATCH_SIZE < crawledDirectories.length) {
          await new Promise((resolve) => setTimeout(resolve, DELAY));
        }
      }
      return await Promise.all(ccFilesPromises);
    } catch (error) {
      throw new Error(error);
    }
  },
};
