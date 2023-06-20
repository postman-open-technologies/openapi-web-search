const {retrieveDefinations} = require('../drivers/common-crawl-driver');
// const GoogleBigQueryDriver = require('../drivers/google-big-query-driver');

module.exports = {
  'start-crawling': async function (req, res) {
    try {
      const validatableResults = await retrieveDefinations();
      res.ok('OK');
    } catch (error) {
      console.error(error);
    }
  },
};
