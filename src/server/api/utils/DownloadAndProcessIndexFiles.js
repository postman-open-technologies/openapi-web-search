const axios = require('axios');
const { startWorker } = require('../workers/DownloadAndProcessWorker');

module.exports = {
  downloadAndProcessIndexFilesInBackground: async function (indexFiles) {
    try {
      await axios({
        url: 'http://localhost:1337/api/v1/download/process/index-files',
        method: 'POST',
        data: {
          indexFiles,
        },
      });

      startWorker();
    } catch (error) {
      throw error;
    }
  },
};
