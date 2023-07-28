module.exports = {
  /**
   * Asynchronously fetches index files from the database using the specified filter options.
   *
   * @function fetchIndexFilesFromDBUtils
   * @param {Object} filter - An object containing filter options for fetching index files.
   * @param {number} [filter.skip] - The number of index files to skip before returning results (default: 0).
   * @param {number} [filter.limit] - The maximum number of index files to return (default: Infinity).
   * @param {'aes' | 'des'} [filter.sort] - The sorting order for the index files (default: 'aes').
   *                                        Use 'aes' for ascending and 'des' for descending.
   * @returns {Promise<Array>} A Promise that resolves with an array of index files fetched from the database.
   * @throws {Error} If there is an error during the database query, it will be thrown.
 */
  fetchIndexFilesFromDBUtils: async function (filter) {
    try {
      const orderMap = {
        'aes': 1,
        'des': -1
      };

      const skp = filter.skip === undefined ? 0 : parseInt(filter.skip);
      const lmt = filter.limit === undefined ? Infinity : parseInt(filter.limit);
      const srt = filter.sort === undefined ? 1 : orderMap[filter.sort];

      return await IndexFilesModel.find({})
        .sort({ URL: srt })
        .skip(skp)
        .limit(lmt);

    } catch (error) {
      throw error;
    }
  },
};
