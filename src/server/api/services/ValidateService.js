const { downloadFile } = require('./DownloadService');

const OpenAPISchemaValidator = require('openapi-schema-validator').default;

module.exports = {
  validate: async function (url) {
    try {
      downloadFile(url).then(response => {
        
      }).catch(error => {
        throw error;
      });
    } catch (error) {
      throw error;
    }
  },
};
