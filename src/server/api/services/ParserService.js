const { URL_REGEX, API_DEFINITION_REGEX, SUB_DOMAIN_REGEX, KEYWORD_REGEX } = require('../constants/Constants');

module.exports = {
  parsing: function (text) {
    try {
      const matchUrls = text.match(URL_REGEX);
      matchUrls.forEach((url) => {
        const tokens = url.split('/');
        const file = tokens[tokens.length - 1];
        if (API_DEFINITION_REGEX.test(file)) {
          sails.config.globals.parsedUrls.push(url);
        }
      });
    } catch (error) {
      throw error;
    }
  },
};
