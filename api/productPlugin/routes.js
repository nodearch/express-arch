'use strict';

const { ProductController } = require('nodearch').deps.productPlugin.controllers;
const express = require('express');
const productRouter = express.Router();

/******************* Product Router *******************/
productRouter.get('/', ProductController.find);
productRouter.get('/:id', ProductController.findOne);
productRouter.post('/', ProductController.create);
/***************************************************/


module.exports = [
  {
    router: productRouter,
    path: '/product'
  }
];
