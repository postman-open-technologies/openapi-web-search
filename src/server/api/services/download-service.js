const axios = require('axios');
module.exports = {
  downloadFile: async function (url) {
    try {
      return await axios({
        url,
        method: 'GET',
        responseType: 'stream',
        onDownloadProgress: function (progressEvent) {
          const total = progressEvent.total;
          const downloaded = progressEvent.loaded;

          const percent = Math.round((downloaded / total) * 100);

          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(
            `Downloading: ${percent}% (${downloaded}/${total} bytes)`
          );
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
};
