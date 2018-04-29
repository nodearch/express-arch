'use strict';

const http = require("http");
const arch = require('nodearch');

const app = arch.expressApp;
const server = http.createServer(app);

function listen () {

  server.listen(arch.config.server);
  server.on("error", onError);
  server.on("listening", onListening);

  arch.server = server;

  return server;
}

function onError(error) {
  if (error.syscall !== "listen") throw error;

  const port = arch.config.server.port;

  switch (error.code) {
    case "EACCES":
      arch.log.error(`port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      arch.log.error(`port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  arch.log.info(`Server running at: ${addr.address ? 'http://' + addr.address + ':' : ''}${addr.port}`);
}


module.exports = listen;
