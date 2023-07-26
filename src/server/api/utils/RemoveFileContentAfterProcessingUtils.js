const fs = require('fs');
const { FILE_PATH } = require('../constants/Constants');

module.exports = {
  removeFileContentAfterProcessing: function () {
    try {
      fs.writeFileSync(FILE_PATH, '', () => {
        console.log('File is cleared.');
      });
    }
    catch(error) {
      throw error;
    }
  },
};
