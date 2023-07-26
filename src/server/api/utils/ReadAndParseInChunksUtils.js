const { FILE_PATH, CHUNK_SIZE } = require('../constants/Constants');
const fs = require('fs');
const {
  removeFileContentAfterProcessing,
} = require('./RemoveFileContentAfterProcessingUtils');
const { parsing } = require('../services/ParserService');
const { saveAPIsDefinitions } = require('./SaveIntoDBUtils');

module.exports = {
  readAndParseInChunks: function (Channel, message) {
    try {
      const readStream = fs.createReadStream(FILE_PATH, {
        highWaterMark: CHUNK_SIZE,
      });

      readStream.on('data', async (chunk) => {
        const text = chunk.toString();
        parsing(text);
      });

      readStream.on('end', async () => {
        removeFileContentAfterProcessing();

        saveAPIsDefinitions(sails.config.globals.parsedUrls)
          .then(() => {
            sails.config.globals.parsedUrls = [];
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
