const axios = require('axios');
const readline = require('readline');
const { PROGRESS_BAR_WIDTH } = require('../constants/Constants');
const { formatSizeUnits } = require('../utils/FormatSizeUnitsUtils');

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

          const totalSize = formatSizeUnits(total);
          const downloadedSize = formatSizeUnits(downloaded);

          const progress = '*'
            .repeat(Math.round(percent / (100 / PROGRESS_BAR_WIDTH)))
            .padEnd(PROGRESS_BAR_WIDTH, ' ');

          readline.clearLine(process.stdout);
          readline.cursorTo(process.stdout, 0);

          process.stdout.write(
            `Progress: [${progress}] ${percent}% (${downloadedSize}/${totalSize})`
          );
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
