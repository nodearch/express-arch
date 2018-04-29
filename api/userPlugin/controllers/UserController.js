"use strict";

const { services } = require('nodearch').deps.userPlugin;
const { UserService } = services;

module.exports = {

  create: (req, res) => {
    UserService
      .create({
        name: req.body.name,
        age: req.body.age
      })
      .then(result => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.send(500);
      });
  },

  find: (req, res) => {
    UserService
      .find(req.query)
      .then(result => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.send(500);
      });
  },

  findOne: (req, res) => {
    UserService
      .findOne(req.params.id)
      .then(result => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.send(500);
      });
  }

};
