const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');

const app = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 }));

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

const host = config.env.HOST || 'localhost';
const port = config.env.PORT || 3000;

app.set('port', port);

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Create an HTTPS server
  const sslOptions = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
  };

  const server = https.createServer(sslOptions, app);

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  server.listen(port, host);

  consola.ready({
    message: `Server listening on https://${host}:${port}`,
    badge: true,
  });
}

start();
