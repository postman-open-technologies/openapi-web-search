module.exports = {
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
      indexFiles.forEach(async url => {
        await IndexFilesModel.create({URL: url});
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Asynchronously saves a list of API definitions to the database.
   *
   * @function saveAPIsDefinitions
   * @param {Array<string>} definitions - An array of API definitions to be saved to the database.
   * @returns {Promise<void>} A Promise that resolves when all API definitions have been saved to the database.
   * @throws {Error} If there is an error during the database insertion process, it will be thrown.
 */
  saveAPIsDefinitions: async function(definitions) {
    try {
      definitions.forEach(async url => {
        await APIsDefinitionsModel.create({APIsDefinition: url});
      });
    } catch(error) {
      throw error;
    }
  }
};
