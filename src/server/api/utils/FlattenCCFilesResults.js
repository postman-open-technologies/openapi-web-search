module.exports = {
  flattenCCFilesResults: async function (ccFilesResults) {
    return ccFilesResults.reduce((acc, curr) => acc.concat(...curr), []);
  },
};
