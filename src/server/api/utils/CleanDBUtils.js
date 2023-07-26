module.exports = {
  cleanDB: async function (model) {
    try {
      await model.destroy({});
      console.log('\nDatabase is cleaned.\n');
    } catch (error) {
      throw error;
    }
  },
};
