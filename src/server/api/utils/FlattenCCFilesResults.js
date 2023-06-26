module.exports = {
  /**
   * Flattens a 3D array of ccFilesResults into a 1D array.
   *
   * @param {Array<Array<Array<string>>>} ccFilesResults - The 3D array of ccFilesResults to be flattened.
   * @returns {Array<any>} - The flattened 1D array.
   */
  flattenCCFilesResults: function (ccFilesResults) {
    return ccFilesResults.reduce((acc, curr) => acc.concat(...curr), []);
  },
};
