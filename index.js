require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataRouter = require('./src/routes/init');

const app = express();
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ /*limit: '200mb',*/ extended: true }));
app.use(dataRouter);

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT, function () {
  console.log(`Listening on ${process.env.PORT}`);
});
