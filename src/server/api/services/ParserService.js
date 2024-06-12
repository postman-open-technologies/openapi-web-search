const { URL_REGEX, API_DEFINITION_REGEX } = require('../constants/Constants');

module.exports = {
  /**
   * Parses the given text to extract URLs and filter API definition URLs.
   *
   * @function parsing
   * @param {string} text - The input text to parse and extract URLs from.
   * @throws {Error} If there is an error during the parsing process, it will be thrown.
 */
  parsingService: function (text) {
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
