const { searchForQuery } = require('../utils/ElasticsearchUtils');

module.exports = {
  /**
   * Starts a search operation based on provided keywords.
   *
   * @function startSearching
   * @async
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @returns {Object} The JSON response containing search results.
   * @throws {400} If the query parameter is missing.
   * @throws {500} If an internal server error occurs.
   *
   * @example
   * // Request:
   * // GET /search?q=authentication
   * //
   * // Response:
   * // 200 OK
   * // [
   * //   {
   * //     '_id': '123',
   * //     '_score': 1.0,
   * //     '_source': {
   * //       'url': 'https://api.example.com',
   * //       'content': {
   * //         /* ... * /
   * //       }
   * //     }
   * //   },
   * //   /* ... * /
   * // ]
   */
  startSearching: async function (req, res) {
    try {
      const client = sails.client;
      const keywords = req.query.q;

      if (keywords === undefined) {
        return res.badRequest('Query not found!');
      }

      const searchResults = await searchForQuery(client, keywords);

      return res.json(searchResults);
    } catch (error) {
      return res.serverError(error.message);
    }
  },
};
