const childProcess = require('child_process');
const mongoose = require('mongoose');
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
    console.error('Worker process error:', error);
  });

  // Handle the exit of the worker process
  workerProcess.on('exit', (code) => {
    console.log('Worker process exited with code:', code);
  });

  // Handle a graceful shutdown of the worker process on Sails.js app termination
  process.on('SIGINT', () => {
    console.log('Terminating worker process...');
    workerProcess.kill('SIGINT');
    process.exit();
  });


  try {
    await mongoose.connect(sails.config.datastores.default.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    throw error;
  }


};
