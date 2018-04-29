'use strict';

const Mocha = require('mocha');
const path = require('path');
const _ = require('lodash');

const { paths, deps, fs, env, config } = require('nodearch');

const mocha = new Mocha(getOptions());


function getOptions () {
  const options = {};
  _.forEach(process.argv.slice(3), arg => {
    const keyValue = arg.split('=');
    options[keyValue[0]] = keyValue[1];
  });
  return options;
}

async function addTests () {

  for (const pluginName of _.keys(deps)) {
    const testsPath = path.resolve(paths.api, pluginName, _.get(config, 'mocha.component') || 'test');
    const isExist = await fs.canRead(testsPath);
    if (isExist) {
      const testFiles = await fs.readdir(testsPath);
      _.forEach(testFiles, (t) => mocha.addFile(path.resolve(testsPath, t)));
    }
  }
}

module.exports = {

  after: async function () {

    const runEnv = _.get(config, 'mocha.env') || 'test';

    if (env === runEnv) {
      await addTests();

      mocha.run(function (failures) {
        process.exit(failures);
      });

    }
  }

};