const fs = require('fs');
const { FILE_PATH } = require('../constants/Constants');

module.exports = {
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
