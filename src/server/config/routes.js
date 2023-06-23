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

  /**
   * payload for a POST route
   *
   * dataSource: commonCrawl;
   * dataSource: bigQuery;
   * dataSource: github;
   * dataSource: web;
   * etc...
   */
  'POST /api/v1/run/crawler': 'CrawlingController.start-crawling'

};