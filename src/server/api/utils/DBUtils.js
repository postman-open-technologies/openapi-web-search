const { validatingService } = require('../services/ValidateService');

module.exports = {
  /**
   * Asynchronously cleans the database by destroying all records of the specified model.
   *
   * @function cleanDB
   * @param {Object} model - The database model to clean (e.g., Waterline model).
   * @throws {Error} If there is an error during the database cleaning process, it will be thrown.
   */
  cleanDB: async function (model) {
    try {
      await model.destroy({});
      console.log('\nDatabase is cleaned.\n');
    } catch (error) {
      throw error;
    }
  },

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
        aes: 1,
        des: -1,
      };

      const skp = filter.skip === undefined ? 0 : parseInt(filter.skip);
      const lmt =
        filter.limit === undefined ? Infinity : parseInt(filter.limit);
      const srt = filter.sort === undefined ? 1 : orderMap[filter.sort];

      return await IndexFilesModel.find({})
        .sort({ URL: srt })
        .skip(skp)
        .limit(lmt);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Asynchronously saves a list of index file URLs to the database.
   *
   * @function saveIndexFiles
   * @param {Array<string>} indexFiles - An array of index file URLs to be saved to the database.
   * @returns {Promise<void>} A Promise that resolves when all index file URLs have been saved to the database.
   * @throws {Error} If there is an error during the database insertion process, it will be thrown.
   */
  saveIndexFiles: async function (indexFiles) {
    try {
      indexFiles.forEach(async (url) => {
        await IndexFilesModel.create({ URL: url });
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Asynchronously saves API definitions to a file and database.
   *
   * @function saveAPIsDefinitions
   * @param {string[]} definitions - An array of API definitions (URLs) to be saved.
   * @throws {Error} If there's an error while saving the definitions to the file or the database.
   * @returns {Promise<void>} A Promise that resolves once all definitions have been saved.
   */
  saveAPIsDefinitions: async function (definitions) {
    try {
      definitions.forEach(async (url) => {
        validatingService(url)
          .then(async () => {
            await APIsDefinitionsModel.create({ url });
          })
          .catch((error) => {
            console.log(`\nInvalid definition! ${error.message}\n`);
          });
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetches API definitions from the database using utility functions.
   *
   * @async
   * @function fetchDefinitionsFromDBUtils
   * @returns {Promise<Array>} A promise that resolves to an array of API definitions.
   * @throws {Error} If an error occurs while fetching the API definitions from the database.
   */
  fetchDefinitionsFromDBUtils: async function () {
    try {
      return await APIsDefinitionsModel.find({});
    } catch (error) {
      throw error;
    }
  },
};
