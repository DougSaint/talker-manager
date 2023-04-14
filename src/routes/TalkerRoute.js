const express = require('express');
const utils = require('../utils/index');

const talkerRoute = express.Router();

talkerRoute.get('/', async (req, res) => {

  return res.status(200).json({});
});

talkerRoute.post('/', async (req, res) => {
  const simpson = req.body;

  return res.status(201).json({});
});

talkerRoute.put('/:id', async (req, res) => {
  const { id } = req.params;

  return res.status(200).json({});
});

talkerRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;

  return res.status(204).json();
});

module.exports = talkerRoute;