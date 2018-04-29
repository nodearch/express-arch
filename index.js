"use strict";


const arch = require("nodearch");
const express = require("express");

const app = express();
arch.expressApp = app;

arch.start(() => {
  require('./server/middleware');
  require('./server/listen')();
});
