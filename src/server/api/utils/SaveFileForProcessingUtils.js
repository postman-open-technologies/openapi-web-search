const fs = require('fs');
const zlib = require('zlib');
const { FILE_PATH } = require('../constants/Constants');

module.exports = {
  saveFileForProcessing: function (response) {
    try {
      const writer = fs.createWriteStream(FILE_PATH);
      response.data.pipe(zlib.createGunzip()).pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          resolve();
        });
        writer.on('error', reject);
      });
    } catch(error) {
      throw error;
    }
  },
};
