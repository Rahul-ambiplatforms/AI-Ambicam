const express = require('express');
const https = require('https');
const fs = require('fs');
const api = require('./').handler;
const consola = require('consola');

let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

const host = config.env.HOST || 'localhost';
const port = config.env.PORT_API || 3001;

// SSL Certificate and Key
const sslOptions = {
  key: fs.readFileSync('./server.key'), // Replace with the actual path
  cert: fs.readFileSync('./server.crt'), // Replace with the actual path
};

const app = express();

// Use your existing middleware and routes
app.use(api);

// Create an HTTPS server
const server = https.createServer(sslOptions, app);

// Listen on the specified port and host
server.listen(port, host, () => {
  consola.ready({
    message: `API listening on https://${host}:${port}`,
    badge: true,
  });
});
