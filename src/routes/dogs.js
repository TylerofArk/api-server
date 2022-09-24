'use strict';

const express = require('express');
const router = express.Router();
const { dogsInterface } = require('../models');

router.get('/dogs', async (req, res) => {
  const dogs = await dogsInterface.read();
  res.status(200).json(dogs);
});

router.get('/dogs/:id', async (req, res) => {
  let { id } = req.params;
  const dogs = await dogsInterface.read(id);
  res.status(200).json(dogs);
});

router.post('/dogs', async (req, res, send) => {
  console.log('Request body:', req.body);
  const newDog = await dogsInterface.create(req.body);
  res.status(200).send(newDog);
});

router.put('/dogs/:id', async (req, res) => {
  const { id } = req.params;
  const update = await dogsInterface.update(req.body, id);
  res.status(200).send(`${update}' updated successfully.`);
});

router.delete('/dogs/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await dogsInterface.delete(id);
  res.status(200).send(`${deleted} deleted successfully`);
});

module.exports = router;
