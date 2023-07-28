const fs = require('fs');
const zlib = require('zlib');
const { FILE_PATH } = require('../constants/Constants');
const { checkAndCreateDistFiles } = require('./CheckAndCreateDistFiles');

module.exports = {
  /**
   * Saves a file for processing by writing it to a specified file path after decompressing it.
   *
   * @function saveFileForProcessing
   * @param {Object} response - The response object containing the file data to be processed.
   * @returns {Promise<void>} A Promise that resolves when the file has been saved for processing.
   * @throws {Error} If there is an error during the file saving or decompression process, it will be thrown.
   */
  saveFileForProcessing: function (response) {
    try {
      checkAndCreateDistFiles(FILE_PATH);
      const writer = fs.createWriteStream(FILE_PATH);
      response.data.pipe(zlib.createGunzip()).pipe(writer);

      // Return a Promise that resolves when the file has been saved for processing
      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          resolve();
        });
        writer.on('error', reject);
      });
    } catch (error) {
      throw error;
    }
  },
};
