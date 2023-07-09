const CC_SERVER_URL = 'https://index.commoncrawl.org/';
const SCHEDULE = '0 0 * * 0';
const RABBITMQ_URL = 'amqp://localhost:5672';
const QUEUE_NAME = 'background-jobs';
const FILE_PATH = `${__dirname}/../../data/output.txt`;

module.exports = { CC_SERVER_URL, SCHEDULE, RABBITMQ_URL, QUEUE_NAME, FILE_PATH };
