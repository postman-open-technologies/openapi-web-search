const { downloadFile } = require('../services/DownloadService');
const { removeFileAfterProcessing } = require('./RemoveFileAfterProcessing');
const { saveFileForProcessing } = require('./SaveFileForProcessing');

module.exports = {
  processJob: async function (job) {
    try {
      const { url } = job;

      const response = await downloadFile(url);

      try {
        await saveFileForProcessing(response);
      } catch(error) {
        throw error;
      }

      // parsing and validating code maybe, will write here...



      // removing the file in order to process next file
      try {
        await removeFileAfterProcessing();
      } catch(error) {
        throw error;
      }


    } catch (error) {
      throw error;
    }
  },
};
