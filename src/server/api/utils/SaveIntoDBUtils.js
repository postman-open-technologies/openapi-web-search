const fs = require('fs');
const { RESULTS_FILE_PATH } = require('../constants/Constants');
const { checkAndCreateDistFiles } = require('./CheckAndCreateDistFiles');

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
   * Asynchronously saves API definitions to a file and database.
   *
   * @function saveAPIsDefinitions
   * @param {string[]} definitions - An array of API definitions (URLs) to be saved.
   * @throws {Error} If there's an error while saving the definitions to the file or the database.
   * @returns {Promise<void>} A Promise that resolves once all definitions have been saved.
 */
  saveAPIsDefinitions: async function(definitions) {
    try {
      checkAndCreateDistFiles(RESULTS_FILE_PATH);
      definitions.forEach(async url => {
        fs.writeFileSync(RESULTS_FILE_PATH,`${url}\n`, { flag: 'a+' });
        await APIsDefinitionsModel.create({APIsDefinition: url});
      });
    } catch(error) {
      throw error;
    }
  }
};