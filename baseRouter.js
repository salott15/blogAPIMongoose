const express = require('express');
const baseRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BaseRoute} = require('./basemodels');

baseRouter.get('/', (req, res) => {
  res.json(BaseRoute.get());
});
baseRouter.post('/', (req, res) => {
  res.status(201).json({id:'goodbye'});
});

module.exports = baseRouter;
