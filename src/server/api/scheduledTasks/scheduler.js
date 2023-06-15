const cron = require('node-cron');
const CrawlerFasade = require('../Fasades/CrawlerFasade');
const CommonCrawlDriver = require('../drivers/CommonCrawlDriver');
const GoogleBigQueryDriver = require('../drivers/GoogleBigQueryDriver');

const commonCrawlDriver = new CommonCrawlDriver();
const commonCrawlFasade = new CrawlerFasade(commonCrawlDriver);
const googleBigQueryDriver = new GoogleBigQueryDriver();
const googleBigQueryCrawlFasade = new CrawlerFasade(googleBigQueryDriver);
const { crawlCommonCrawlDataset, crawlGoogleBigQueryDataset } = require('../services/CrawlerService');

class DatasetCrawler {
  constructor() {
    this.schedule = '0 0 * * 0'; // Execute once in a week.
  }

  async start() {
    const commonCrawlIndexData = await crawlCommonCrawlDataset(commonCrawlFasade);
    console.log(commonCrawlIndexData);

    // const googleBigQueryIndexData = await crawlGoogleBigQueryDataset();
    // console.log(googleBigQueryIndexData);

    // cron.schedule(this.schedule, () => {
    //   this.crawlDatasets();
    // });
  }

  // crawlDatasets() {
  //   console.log('Crawling datasets...');
  // }
}

module.exports = new DatasetCrawler();
