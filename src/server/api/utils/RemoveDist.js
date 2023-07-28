const fs = require('fs');
const { DIST_PATH } = require('../constants/Constants');

module.exports = {
  removeDist: function () {
    try {
      fs.rmSync(DIST_PATH, { recursive: true, force: true });
    } catch(error) {
      throw error;
    }
  },
};
