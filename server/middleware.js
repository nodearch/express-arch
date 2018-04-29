'use strict';

const path = require('path');
const _ = require('lodash');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const express = require("express");
const arch = require('nodearch');

const app = arch.expressApp;

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

// Add More Middlewares here...

// ----------------------------


// register all routes
const routes = arch.getList('module', 'routes')
_.forEach(routes, route => {
  app.use(route.path, route.router);
});


// not found
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = arch.env === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});
