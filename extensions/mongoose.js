'use strict';

const _ = require('lodash');
const mongoose = require('mongoose'); 
mongoose.Promise = Promise;

const { config, logger } = require('nodearch');


module.exports = {

  before: function () {
    return new Promise((resolve, reject) => {

      if (!config || !config.mongoose) {
        return reject(new Error('mongoose configurations not found!'));
      }

      const { url, options } = config.mongoose;

      if (!url) {
        return reject(new Error('mongo url not found in the mongoose configuration file!'));
      }

      mongoose.connect(url, options);

      const db = mongoose.connection;
      db.on('error', (err) => reject(err));

      db.once('open', () => {
        logger.info('Connected To MongoDB');
        return resolve(db);
      });

    });
  },

  component: function (component, componentName) {

    const extConfig = config.mongoose;
    

    if (componentName === extConfig.schema) {
      _.forEach(_.keys(component), (key) => {
        component[key] = mongoose.model(key, component[key]);
      });
    }

  }

};