const cron = require('node-cron');
const CrawlerFacade = require('../Facades/CrawlerFacade');
const CommonCrawlDriver = require('../drivers/CommonCrawlDriver');
const GoogleBigQueryDriver = require('../drivers/GoogleBigQueryDriver');

const commonCrawlDriver = new CommonCrawlDriver();
const commonCrawlFacade = new CrawlerFacade(commonCrawlDriver);
const googleBigQueryDriver = new GoogleBigQueryDriver();
const googleBigQueryCrawlFacade = new CrawlerFacade(googleBigQueryDriver);
const { crawlCommonCrawlDataset, crawlGoogleBigQueryDataset } = require('../services/CrawlerService');

class DatasetCrawler {
  constructor() {
    this.schedule = '0 0 * * 0'; // Execute once in a week.
  }

  async start() {
    const commonCrawlIndexData = await crawlCommonCrawlDataset(commonCrawlFacade);
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
