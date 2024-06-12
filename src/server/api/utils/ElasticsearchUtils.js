const { INDEX_NAME } = require('../constants/Constants');

module.exports = {
  /**
   * Transforms an API definition document into an indexable format for search purposes.
   *
   * @function transformingDefinitionForIndexing
   * @param {Object} document - The API definition document to be transformed.
   * @param {string} url - The URL associated with the API definition.
   * @returns {Object} An indexable representation of the API definition.
   * @throws {Error} If an error occurs during the transformation process.
   */
  transformingDefinitionForIndexing: function (document, url) {
    try {
      const indexableInfo = {
        url,
        info: document.info,
        tags: document.tags !== undefined ? document.tags : null,
        servers: document.servers !== undefined ? document.servers : null,
      };

      return {
        url: url,
        content: indexableInfo,
      };
    } catch (error) {
      throw error;
    }
  },

  checkForIndex: async function (client) {
    try {
      return await client.indices.exists({ index: INDEX_NAME });
    } catch (error) {
      throw error;
    }
  },

  removeIndex: async function (client) {
    try {
      await client.indices.delete({ index: INDEX_NAME });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Searches for API definitions in an Elasticsearch index based on specified keywords.
   *
   * @async
   * @function searchForQuery
   * @param {Object} client - The Elasticsearch client used for performing the search.
   * @param {string} keywords - The keywords to search for in the API definitions.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of matched API definition hits.
   * @throws {Error} If an error occurs during the search process.
   */
  searchForQuery: async function (client, keywords) {
    try {
      const response = await client.search({
        index: INDEX_NAME,
        query: {
          multi_match: {
            query: keywords,
            fields: [
              'content.info.title',
              'content.info.description',
              'content.tags.name',
            ],
          },
        },
      });

      return response.hits.hits;
    } catch (error) {
      throw error;
    }
  },
};
