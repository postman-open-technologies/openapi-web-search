const CC_SERVER_URL = 'https://index.commoncrawl.org/';
const RABBIT_MQ_URL = 'amqp://localhost:5672';
const QUEUE_NAME = 'index-files-jobs';
const FILE_PATH = `${__dirname}/../../dist/data/output.txt`;
const RESULTS_FILE_PATH = `${__dirname}/../../dist/results/results.txt`;
const DIST_PATH = `${__dirname}/../../dist`;
const CHUNK_SIZE = 1024 * 1024 * 2;
const PROGRESS_BAR_WIDTH = 50; // Width of the progress bar
const URL_REGEX = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/gi;
const API_DEFINITION_REGEX = /^(openapi|swagger)\.(json|yaml|yml)(\?[\w=&]+)?$/;
const SUB_DOMAIN_REGEX = /^(?:https?:\/\/)?api\.[^\/\s]+\.[^\/\s]+(?:\/[^\/\s]*)*$/gi;
const KEYWORD_REGEX = /^(?:https?:\/\/)?[^\/\s]+(?:\/[^\/\s]+)*(?:\/(openapi|swagger))(?:\/[^\/\s]*)*$/gi;

module.exports = { CC_SERVER_URL, RABBIT_MQ_URL, QUEUE_NAME, FILE_PATH, CHUNK_SIZE, PROGRESS_BAR_WIDTH, URL_REGEX, API_DEFINITION_REGEX, SUB_DOMAIN_REGEX, KEYWORD_REGEX, RESULTS_FILE_PATH, DIST_PATH };
