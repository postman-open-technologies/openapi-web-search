const { retrieveDefinitionsFromCC } = require('../drivers/CommonCrawlDriver');
const {
  retrieveDefinitionsFromBigQuery,
} = require('../drivers/GoogleBigQueryDriver');
const {
  retrieveDefinitionsFromGithub,
} = require('../drivers/GithubCrawlerDriver');
module.exports = {
  selectDataSources: async function (dataSource, historicalData) {
    switch (dataSource) {
      case 'commonCrawl':
        return await retrieveDefinitionsFromCC(historicalData);
      case 'github':
        return await retrieveDefinitionsFromGithub();
      case 'bigQuery':
        return await retrieveDefinitionsFromBigQuery();
      default:
        return res.badRequest('Invalid data source');
    }
  },
};
