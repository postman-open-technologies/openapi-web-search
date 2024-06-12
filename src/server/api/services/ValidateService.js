const SwaggerParser = require('swagger-parser');

module.exports = {
  validatingService: async function (url) {
    try {
      return await SwaggerParser.validate(url);
    }
    catch(error) {
      throw error;
    }
  },
};
