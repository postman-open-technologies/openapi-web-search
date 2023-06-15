async function crawlDataset(crawlFacade) {
  try {
    return await crawlFacade.crawlData();
  } catch (error) {
    console.error('ERROR:', error);
  }
}

module.exports = {
  async crawlCommonCrawlDataset(commonCrawlFacade) {
    const data = await crawlDataset(commonCrawlFacade);
    return null;
  },
  async crawlGoogleBigQueryDataset(googleBigQueryCrawlFacade) {
    const data = await crawlDataset(googleBigQueryCrawlFacade);
    return null;
  }
};
