const { URL } = require('../constants/constants');
class CommonCrawlDriver {
  // async getDataFromCommomCrawlServer(url) {
  //   try {
  //     const links = [];
  //     const { data } = await axios.get(url);
  //     const html = data;
  //     const $ = await cheerio.load(html);
  //     $('tbody tr').each((index, row) => {
  //       const linkTd = $(row).find('td:last-child');
  //       const link = linkTd.find('a').attr('href');
  //       links.push(link);
  //     });
  //     return links;
  //   } catch (e) {
  //     // handle errors gracefully
  //     console.log(e);
  //   }
  // }
  async crawlData() {
    try {
      console.log('Crawl for common crawl dataset...');
      // const data = await getDataFromCommomCrawlServer(URL);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = CommonCrawlDriver;
