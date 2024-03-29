const { cleanDB } = require('../utils/DBUtils');
const { saveIndexFiles } = require('../utils/DBUtils');
const { selectDataSources } = require('../utils/SelectDataSourcesUtils');

module.exports = {
  /**
   * Endpoint for starting the crawling process.
   * Controller for the 'start-crawling' route. Initiates the crawling process based on the provided data source.
   * Retrieves API definitions from the selected data source and sends the response accordingly.
   *
   * @route POST /api/v1/run/crawler
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Object} req.body - The payload of the request.
   * @param {string} req.body.dataSource - The data source for crawling.
   * @param {boolean} req.query.latest - Indicates whether to use the latest data.
   * @returns {Array<string>} An array of API definition URLs, or an error response.
   * @throws {Error} If an error occurs during the crawling process.
   *
   * @example
   * Request body example:
   * {
   *   'dataSource': 'commonCrawl'
   * }
   *
   * @example
   * Query parameter example:
   * /api/v1/run/crawler?latest=true
   * or
   * /api/v1/run/crawler?latest=false
   *
   * @example
   * Response example:
   * [
   *   'https://api.example.com/definition1',
   *   'https://api.example.com/definition2',
   *   ...
   * ]
   */
  startCrawling: async function (req, res) {
    try {
      const { dataSource } = req.body;
      /**
       * If req.query.latest is truthy and equals the string 'true', then latest is set to true; else latest is set to false;
       * otherwise, it is set to the default value true.
       */
      const latest = req.query.latest ? req.query.latest === 'true' : true;

      if (!dataSource) {
        return res.badRequest('Data source not provided');
      }

      const indexFiles = await selectDataSources(dataSource, latest);

      if(indexFiles.length === 0) {
        return res.notFound('Cannot able to scrape index files.');
      }

      await cleanDB(IndexFilesModel);
      await saveIndexFiles(indexFiles);

      return res.json({ indexFiles });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
