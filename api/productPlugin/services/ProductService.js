'use strict';

const { models } = require('nodearch').deps.productPlugin;

const { Product } = models;

module.exports = {
  create: (data) => {
    return Product
      .create(data); 
  },

  find: (criteria) => {
    return Product
      .find(criteria);
  },

  findOne: (id) => {
    return Product
      .findOne({ _id: id });
  }
};
