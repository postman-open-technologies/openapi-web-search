const { selectDataSources } = require('../utils/SelectDataSources');

module.exports = {
  /**
    * Controller for the 'start-crawling' route. Initiates the crawling process based on the provided data source.
    * Retrieves API definitions from the selected data source and sends the response accordingly.
    * @param {Object} req - The request object containing the data source and data fetching flag in the body.
    * @param {Object} res - The response object to send the result back to the client.
    * @returns {Object} - The response containing the retrieved API definitions or appropriate error messages.
    *
    * note: The dataFetchingFlag is a boolean flag used to determine the data year selection behavior.
    * If the flag is set to false, the controller fetches only the latest year's data.
    * If the flag is set to true, the controller fetches data from the latest year (2023) down to the year 2009.
    * @typedef {boolean} dataFetchingFlag
    */
  'start-crawling': async function (req, res) {
    try {
      const { dataSource } = req.body;
      const { dataFetchingFlag } = req.body;
      if (!dataSource) {
        return res.badRequest('Data source not provided');
      }
      let apiDefinitions = await selectDataSources(
        dataSource,
        dataFetchingFlag
      );
      if (!apiDefinitions || apiDefinitions.length === 0) {
        return res.notFound('No API definitions found');
      }
      return res.json(apiDefinitions);
    } catch (error) {
      return res.serverError(error);
    }
  },
};
