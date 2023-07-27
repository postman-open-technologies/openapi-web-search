module.exports = {
  /**
   * Asynchronously cleans the database by destroying all records of the specified model.
   *
   * @function cleanDB
   * @param {Object} model - The database model to clean (e.g., Waterline model).
   * @throws {Error} If there is an error during the database cleaning process, it will be thrown.
 */
  cleanDB: async function (model) {
    try {
      await model.destroy({});
      console.log('\nDatabase is cleaned.\n');
    } catch (error) {
      throw error;
    }
  },
};
