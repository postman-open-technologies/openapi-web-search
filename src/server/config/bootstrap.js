const childProcess = require('child_process');
const ElasticSearchConnection = require('../api/utils/ConnectElasticSearchUtils');
const mongoose = require('mongoose');
const { INDEX_NAME } = require('../api/constants/Constants');
const { checkForIndex, removeIndex } = require('../api/utils/ElasticsearchUtils');
/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  // Spawn the worker.js script as a child process
  const workerProcess = childProcess.fork(
    `${__dirname}/../api/workers/DownloadAndProcessWorker.js`
  );

  // Handle any errors from the worker process
  workerProcess.on('error', (error) => {
    sails.log.error('Worker process error:', error);
  });

  // Handle the exit of the worker process
  workerProcess.on('exit', (code) => {
    sails.log.info('Worker process exited with code:', code);
  });

  // Handle a graceful shutdown of the worker process on Sails.js app termination
  process.on('SIGINT', () => {
    sails.log.error('Terminating worker process...');
    workerProcess.kill('SIGINT');
    process.exit();
  });

  try {
    await mongoose.connect(sails.config.datastores.default.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    sails.log.info('MongoDB connected successfully!');
  } catch (err) {
    sails.log.error('Error connecting to MongoDB:', err.message);
    throw error;
  }

  const client = ElasticSearchConnection.getClient();

  try {
    const isExists = await checkForIndex(client);

    if (isExists) {
      await removeIndex(client);
      sails.log.info(
        `Removing already exist index in order to prevent conflict: Index ${INDEX_NAME} deleted.`
      );
    }

    sails.client = client;
  } catch (error) {
    sails.log.error('Error creating Elasticsearch index:', error.message);
  }
};
