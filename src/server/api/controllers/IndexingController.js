const SwaggerParser = require('swagger-parser');
const { fetchDefinitionsFromDBUtils } = require('../utils/DBUtils');
const {
  transformingDefinitionForIndexing,
  checkForIndex,
  removeIndex,
} = require('../utils/ElasticsearchUtils');
const { INDEX_NAME } = require('../constants/Constants');

module.exports = {
  /**
   * Starts the process of indexing validated OpenAPI definitions.
   *
   * @function startIndexing
   * @async
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @returns {Object} The response indicating the indexing status.
   * @throws {400} If there are no OpenAPI definitions to fetch.
   * @throws {500} If an internal server error occurs during indexing.
   *
   * @example
   * // Request:
   * // POST /start-indexing
   * //
   * // Response:
   * // 200 OK
   * // 'OpenAPI definitions have been indexed!'
   */
  startIndexing: async function (req, res) {
    try {
      const client = sails.client;
      const transformedResults = [];
      const validatedAPIDefinitions = await fetchDefinitionsFromDBUtils();

      if (validatedAPIDefinitions.length === 0) {
        return res.badRequest('There are no OpenAPI definitions to fetch!');
      }

      for (const { url } of validatedAPIDefinitions) {
        const document = await SwaggerParser.parse(url);
        transformedResults.push(
          transformingDefinitionForIndexing(document, url)
        );
      }

      const isExists = await checkForIndex(client);
      if (isExists) {
        await removeIndex(client);
      }

      await client.helpers.bulk({
        datasource: transformedResults,
        onDocument() {
          return {
            index: { _index: INDEX_NAME },
          };
        },
      });

      return res.send('OpenAPI definitions has been indexed!');
    } catch (error) {
      res.serverError(error);
    }
  },
};
