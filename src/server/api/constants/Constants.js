const CC_SERVER_URL =
  'https://data.commoncrawl.org/cc-index/collections/index.html';
const RABBIT_MQ_URL = 'amqp://localhost:5672';
const ELASTIC_LOCAL_URL = 'https://localhost:9200';
const ELASTIC_HTTP_CRED =
  '/home/priyanshu/Downloads/ELK/primary-node/config/certs/http_ca.crt';
const INDEX_NAME = 'openapi_definition';
const QUEUE_NAME = 'index-files-jobs';

// local elastic search instance credentials
const ELASTIC_USERNAME = 'elastic';
const ELASTIC_PASSWORD = 'pxnS=+fLwN-0j2z=iPgX';

const FILE_PATH = `${__dirname}/../../dist/data/output.txt`;
const RESULTS_FILE_PATH = `${__dirname}/../../dist/results/results.txt`;
const DIST_PATH = `${__dirname}/../../dist`;
const CHUNK_SIZE = 1024 * 1024 * 2;
const PROGRESS_BAR_WIDTH = 50; // Width of the progress bar
const URL_REGEX =
  /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/gi;
const API_DEFINITION_REGEX = /^(openapi|swagger)\.(json|yaml|yml)(\?[\w=&]+)?$/;
const SUB_DOMAIN_REGEX =
  /^(?:https?:\/\/)?api\.[^\/\s]+\.[^\/\s]+(?:\/[^\/\s]*)*$/gi;
const KEYWORD_REGEX =
  /^(?:https?:\/\/)?[^\/\s]+(?:\/[^\/\s]+)*(?:\/(openapi|swagger))(?:\/[^\/\s]*)*$/gi;
const BASE_URL = 'http://localhost:1337';

module.exports = {
  CC_SERVER_URL,
  RABBIT_MQ_URL,
  QUEUE_NAME,
  FILE_PATH,
  CHUNK_SIZE,
  PROGRESS_BAR_WIDTH,
  URL_REGEX,
  API_DEFINITION_REGEX,
  SUB_DOMAIN_REGEX,
  KEYWORD_REGEX,
  RESULTS_FILE_PATH,
  DIST_PATH,
  BASE_URL,
  ELASTIC_LOCAL_URL,
  ELASTIC_HTTP_CRED,
  INDEX_NAME,
  ELASTIC_USERNAME,
  ELASTIC_PASSWORD,
};
