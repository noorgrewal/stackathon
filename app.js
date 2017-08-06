const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();
const server = app.listen(PORT, () => console.log(`Feeling chatty on port ${PORT}`));

module.exports = app;

// logging middleware
app.use(morgan('dev'));

// static middleware
app.use(express.static(path.join(__dirname, '..', 'node_modules')));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 404 middleware
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ?
    res.status(404).send('Not found') :
    next()
);

// send html
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'stackathon.js/map-world.html'))
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);