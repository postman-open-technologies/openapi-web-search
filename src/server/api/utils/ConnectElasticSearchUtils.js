const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');
const { ELASTIC_LOCAL_URL, ELASTIC_HTTP_CRED, ELASTIC_USERNAME, ELASTIC_PASSWORD } = require('../constants/Constants');

const client = new Client({
  node: ELASTIC_LOCAL_URL,
  log: 'error',
  auth: {
    username: ELASTIC_USERNAME,
    password: ELASTIC_PASSWORD
  },
  tls: {
    ca: fs.readFileSync(ELASTIC_HTTP_CRED),
    rejectUnauthorized: false
  }
});

module.exports = {
  getClient: function() {
    return client;
  },
};
