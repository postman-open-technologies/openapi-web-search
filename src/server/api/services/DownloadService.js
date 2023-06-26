const axios = require('axios');

module.exports = {
  /**
   * Downloads a file from the https://index.commoncrawl.org/ URL using the GET method and stream response type.
   * Provides download progress information while downloading the file.
   * @param {string} url - The URL of the file to be downloaded.
   * @returns {Promise} - A promise that resolves to the downloaded file stream.
   */
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
      throw error;
    }
  },
};
