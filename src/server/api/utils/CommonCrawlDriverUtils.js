const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');
const zlib = require('zlib');

const { downloadFile } = require('../services/DownloadService');

module.exports = {
  /**
   * Retrieves the URLs of index files from a given directory URL.
   *
   * @param {string} url - The URL of the directory containing index files.
   * @returns {Array<string>} An array of index file URLs.
   * @throws {Error} If an error occurs during the retrieval process.
   */
  retrieveIndexFilesUrlsFromDirs: async function (url) {
    try {
      const response = await downloadFile(url);
      const gunzip = zlib.createGunzip();

      const lines = readline.createInterface({
        input: response.data.pipe(gunzip),
      });

      const links = [];

      for await (const line of lines) {
        const regex = /\.gz$/;

        if (!regex.test(line)) {
          continue;
        }

        links.push(`https://data.commoncrawl.org/${line}`);
      }
      return links;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Retrieves URLs of directories from the Common Crawl server based on the provided URL and latest flag.
   *
   * @param {string} url - The URL of the Common Crawl server.
   * @param {boolean} latest - Indicates whether to retrieve the latest directories.
   * @returns {Array<string>} An array of directories endpoint.
   * @throws {Error} If an error occurs during the retrieval process.
   */
  retrieveDirectoriesUrlsFromCCServer: async function (url, latest) {
    try {
      const links = [];
      const { data } = await axios.get(url);

      const html = data;
      const $ = cheerio.load(html);

      if (latest) {
        const row = $('tbody tr')[0];
        const linkTd = $(row).find('td:last-child');
        const link = linkTd.find('a').attr('href');
        links.push(link);
        return links;
      }

      $('tbody tr').each((row) => {
        const linkTd = $(row).find('td:last-child');
        const link = linkTd.find('a').attr('href');
        links.push(link);
      });

      return links;
    } catch (error) {
      throw error;
    }
  },
};
