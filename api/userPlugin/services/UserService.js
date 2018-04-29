'use strict';

const { models } = require('nodearch').deps.userPlugin;

const { User } = models;

module.exports = {
  create: (data) => {
    return User
      .create(data); 
  },

  find: (criteria) => {
    return User
      .find(criteria);
  },

  findOne: (id) => {
    return User
      .findOne({ _id: id });
  }
};
