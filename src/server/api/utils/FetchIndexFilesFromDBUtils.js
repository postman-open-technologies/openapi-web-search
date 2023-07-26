module.exports = {
  fetchIndexFilesFromDBUtils: async function (filter) {
    try {

      const sortMap = {
        'aes': 1,
        'des': -1
      };

      const skp = filter.skip === undefined ? 0 : parseInt(filter.skip);
      const lmt = filter.limit === undefined ? Infinity : parseInt(filter.limit);
      const srt = filter.sort === undefined ? 1 : sortMap[filter.sort];


      return await IndexFilesModel.find({})
        .sort({ URL: srt })
        .skip(skp)
        .limit(lmt);

    } catch (error) {
      throw error;
    }
  },
};
