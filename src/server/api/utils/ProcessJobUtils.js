const { downloadFile } = require('../services/DownloadService');
const {
  saveFileForProcessing,
} = require('../utils/SaveFileForProcessingUtils');
const { readAndParseInChunks } = require('../utils/ReadAndParseInChunksUtils');

module.exports = {
  /**
   * Asynchronously processes a job by downloading a file, saving it for processing,
   * and then parsing the downloaded text file to fetch and store API definitions.
   *
   * @function processJob
   * @param {Object} job - The job object containing information about the file to process.
   * @param {Object} Channel - The RabbitMQ channel used for communication.
   * @param {Object} message - The RabbitMQ message associated with the job.
   * @throws {Error} If there is an error during the job processing, it will be thrown.
 */
  processJob: async function (job, Channel, message) {
    try {
      const { url } = job;

      console.log(`\nURL: ${url}`);
      downloadFile(url)
        .then((response) => {
          saveFileForProcessing(response)
            .then(() => {
              console.log(
                '\nParsing the downloaded text file to fetch and store APIs definition...'
              );
              readAndParseInChunks(Channel, message);
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  },
};
