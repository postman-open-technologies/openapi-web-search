/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'POST /api/v1/run/crawler': 'CrawlingController.startCrawling',
  'GET /api/v1/download/process/index-files': 'DownloadAndProcessIndexFilesController.startDownloadAndProcessIndexFiles'

};
