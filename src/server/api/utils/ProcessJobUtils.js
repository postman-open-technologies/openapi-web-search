const { downloadFile } = require('../services/DownloadService');
const { saveFileForProcessing } = require('../utils/SaveFileForProcessingUtils')
const { readAndParseInChunks } = require('../utils/ReadAndParseInChunksUtils');

module.exports = {
  processJob: async function (job, Channel, message) {
    try {
      const { url } = job;

      console.log(`\nURL: ${url}`);

      downloadFile(url).then(response => {

        saveFileForProcessing(response).then(() => {
          console.log('\nParsing the downloaded text file to fetch and store APIs definition...');
          readAndParseInChunks(Channel, message);
        }).catch(error => {
          throw error;
        });

      }).catch(error => {
        throw error;
      });
    } catch (error) {
      throw error;
    }
  },
};
