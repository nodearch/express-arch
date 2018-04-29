"use strict";

const { services } = require('nodearch').deps.productPlugin;
const { ProductService } = services;

module.exports = {

  create: (req, res) => {
    ProductService
      .create({
        name: req.body.name,
        price: req.body.price
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
    ProductService
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
    ProductService
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
