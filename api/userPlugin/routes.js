'use strict';

const { UserController } = require('nodearch').deps.userPlugin.controllers;
const express = require('express');
const userRouter = express.Router();

/******************* User Router *******************/
userRouter.get('/', UserController.find);
userRouter.get('/:id', UserController.findOne);
userRouter.post('/', UserController.create);
/***************************************************/


module.exports = [
  {
    router: userRouter,
    path: '/user'
  }
];
