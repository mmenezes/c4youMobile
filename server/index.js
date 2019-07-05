const path = require('path');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Profile-Id');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/* ---------- MOCK APIs ---------- */

app.post('*/login', function (req, res) {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({}));
});

app.get('*/getCustomerDetails', function (req, res) {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({}));
});

app.get('*/getCarePlan/:username', function (req, res) {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({}));
});

app.post('*/checkin', function (req, res) {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({}));
});

/* ---------- SERVE PAGES ---------- */

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(7003, () => console.log('Listening on port 7001!'));
