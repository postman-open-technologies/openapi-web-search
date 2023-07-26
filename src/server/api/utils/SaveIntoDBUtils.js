module.exports = {
  saveIndexFiles: async function (indexFiles) {
    try {
      indexFiles.forEach(async url => {
        await IndexFilesModel.create({URL: url});
      });
    } catch (error) {
      throw error;
    }
  },
  saveAPIsDefinitions: async function(definitions) {
    try {
      definitions.forEach(async url => {
        await APIsDefinitionsModel.create({APIsDefinition: url});
      });
    } catch(error) {
      throw error;
    }
  }
};
