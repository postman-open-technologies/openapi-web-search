const { selectDataSources } = require('../utils/SelectDataSources');

module.exports = {
  'start-crawling': async function (req, res) {
    try {
      const { dataSource } = req.body;
      const { historicalData } = req.body;
      if (!dataSource) {
        return res.badRequest('Data source not provided');
      }
      let apiDefinitions = await selectDataSources(
        dataSource,
        historicalData
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
