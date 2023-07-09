const { retrieveDefinitionsFromCC } = require('../drivers/CommonCrawlDriver');
const {
  retrieveDefinitionsFromBigQuery,
} = require('../drivers/GoogleBigQueryDriver');
const {
  retrieveDefinitionsFromGithub,
} = require('../drivers/GithubCrawlerDriver');

module.exports = {
  /**
   * Selects and retrieves API definitions based on the specified data source.
   *
   * @param {string} dataSource - The data source to retrieve API definitions from.
   * @param {boolean} latest - Flag indicating whether to retrieve the latest API definitions.
   * @returns {<Array<string>>} A promise that resolves to an array of API definitions.
   * @throws {Error} If an error occurs during the retrieval process or if an invalid data source is provided.
   */
  selectDataSources: async function (dataSource, latest) {
    switch (dataSource) {
      case 'commonCrawl':
        try {
          return await retrieveDefinitionsFromCC(latest);
        }
        catch(error) {
          throw error;
        }

      case 'github':
        try {
          return await retrieveDefinitionsFromGithub();
        }
        catch(error) {
          throw error;
        }

      case 'bigQuery':
        try {
          return await retrieveDefinitionsFromBigQuery();
        }
        catch(error) {
          throw error;
        }

      default:
        return res.badRequest('Invalid data source.');
    }
  },
};
