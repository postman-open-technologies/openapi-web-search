const fs = require('fs');
const path = require('path');
const { FILE_PATH, DIST_PATH } = require('../constants/Constants');

module.exports = {
  /**
   * Asynchronously checks if a file path exists, and if not, creates the necessary directories
   * to accommodate the specified file path.
   * @async
   * @function checkAndCreateFilePath
   * @param {string} FILE_PATH - The file path to check and create if it doesn't exist.
   * @throws {Error} If an error occurs while checking or creating the file path.
 */
  checkAndCreateDistFiles: async function (FILE_PATH) {
    try {
      if (!fs.existsSync(FILE_PATH)) {
        fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
      }
    } catch (error) {
      throw error;
    }
  },



  removeDist: function () {
    try {
      fs.rmSync(DIST_PATH, { recursive: true, force: true });
    } catch(error) {
      throw error;
    }
  },


  /**
   * Removes the content of a file after it has been processed.
   *
   * @function removeFileContentAfterProcessing
   * @throws {Error} If there is an error while clearing the file content, it will be thrown.
 */
  removeFileContentAfterProcessing: function () {
    try {
      // Clear the content of the file by overwriting it with an empty string in order to process next file
      fs.writeFileSync(FILE_PATH, '', () => {
        console.log('File is cleared.');
      });
    }
    catch(error) {
      throw error;
    }
  },
};
