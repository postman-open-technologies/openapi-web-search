// test/integration/controllers/DownloadAndProcessIndexFilesController.test.js
const request = require('supertest');
const { expect } = require('chai');
const { BASE_URL } = require('../../api/constants/Constants');
describe('DownloadAndProcessIndexFilesController', () => {
  it('should queue the index files for consumption by the consumer and also initiate the worker.', async () => {
    try {
      const res = await request(BASE_URL).get(
        '/api/v1/download/process/index-files?skip=0&limit=3&sort=aes'
      );
      expect(res.status).to.equal(202);
    } catch (error) {
      throw error;
    }
  });
});
