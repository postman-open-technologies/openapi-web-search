// test/integration/controllers/CrawlingController.test.js
const request = require('supertest');
const { expect } = require('chai');
const { BASE_URL } = require('../../api/constants/Constants');
const sampleLatestData = require('../data/SampleResponseDataLatest.json');
const sampleHistoricalData = require('../data/SampleResponseDataHistorical.json');

describe('CrawlingController', () => {
  it('should fetch latest data from common crawl index server and process that data into index files and return those files.', async () => {
    try {
      const payload = { dataSource: 'commonCrawl' };

      const res = await request(BASE_URL)
        .post('/api/v1/run/crawler?latest=true')
        .send(payload);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('indexFiles');

      expect(res.body.indexFiles)
        .to.be.an('array')
        .and.to.have.lengthOf(sampleLatestData.indexFiles.length);

      expect(res.body.indexFiles).to.include.members(
        sampleLatestData.indexFiles
      );
    } catch (error) {
      throw error;
    }
  });

  it('should fetch historical data from common crawl index server and process that data into index files and return those files.', async () => {
    try {
      const payload = { dataSource: 'commonCrawl' };

      const res = await request(BASE_URL)
        .post('/api/v1/run/crawler?latest=false')
        .send(payload);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('indexFiles');

      expect(res.body.indexFiles)
        .to.be.an('array')
        .and.to.have.lengthOf(sampleHistoricalData.indexFiles.length);

      expect(res.body.indexFiles).to.include.members(
        sampleHistoricalData.indexFiles
      );
    } catch (error) {
      throw error;
    }
  });
});
