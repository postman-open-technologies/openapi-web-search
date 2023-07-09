const fs = require('fs');
const { FILE_PATH } = require('../constants/Constants');

module.exports = {
  removeFileAfterProcessing: function () {
    fs.unlink(FILE_PATH, (error) => {
      if (error) {
        throw error;
      }
      console.log('File deleted!');
    });
  },
};
