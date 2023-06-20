const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');
const zlib = require('zlib');
const { downloadFile } = require('../services/download-service');

module.exports = {
  retrieveUrlsForIndexFiles: async function (url) {
    try {
      const response = await downloadFile(url);
      const gunzip = zlib.createGunzip();
      const lines = readline.createInterface({ input: response.data.pipe(gunzip) });

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
      console.error(error.message);
    }
  },
  retrieveIndexUrlsFromCCServer: async function (url) {
    try {
      const links = [];
      const { data } = await axios.get(url);
      const html = data;
      const $ = await cheerio.load(html);
      $('tbody tr').each((index, row) => {
        const linkTd = $(row).find('td:last-child');
        const link = linkTd.find('a').attr('href');
        links.push(link);
      });
      return links;
    } catch (error) {
      console.log(error);
    }
  }
};
