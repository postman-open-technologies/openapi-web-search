const { FILE_PATH, CHUNK_SIZE } = require('../constants/Constants');
const fs = require('fs');
const {
  removeFileContentAfterProcessing,
} = require('./FileHandlingUtils');
const { parsingService } = require('../services/ParserService');
const { saveAPIsDefinitions } = require('./DBUtils');

module.exports = {
  /**
   * Reads and parses a large text file in chunks, processing each chunk asynchronously.
   *
   * @function readAndParseInChunks
   * @param {Object} Channel - The RabbitMQ channel used for communication.
   * @param {Object} message - The RabbitMQ message associated with the job.
   * @throws {Error} If there is an error during the file reading or parsing process, it will be thrown.
 */
  readAndParseInChunks: function (Channel, message) {
    try {
      // Create a read stream for the large text file with the specified CHUNK_SIZE
      const readStream = fs.createReadStream(FILE_PATH, {
        highWaterMark: CHUNK_SIZE,
      });

      // Read each chunk from the stream and process it asynchronously
      readStream.on('data', async (chunk) => {
        const text = chunk.toString();
        parsingService(text);
      });

      // The 'end' event is triggered when the entire file has been read
      readStream.on('end', async () => {
        removeFileContentAfterProcessing();
        // Save API definitions extracted from the parsed URLs
        saveAPIsDefinitions(sails.config.globals.parsedUrls)
          .then(() => {
            // Clear the parsedUrls array to prepare for the next job
            sails.config.globals.parsedUrls = [];
            // Acknowledge the completion of processing the message in RabbitMQ
            Channel.ack(message);
            console.log('\nParsing is completed.');
          })
          .catch((error) => {
            throw error;
          });
      });

      readStream.on('error', (error) => {
        throw error;
      });
    } catch (error) {
      throw error;
    }
  },
};
