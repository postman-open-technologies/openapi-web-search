const fs = require('fs');
const path = require('path');
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
};
