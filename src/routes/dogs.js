'use strict';

const express = require('express');
const router = express.Router();
const { DogModel } = require('../models');
const validator = require('../middleware/validator');

router.post('/dogs', async (req, res, send) => {
  console.log('req body', req.body);
  const newDog = await DogModel.create(req.body);
  res.status(200).send(newDog);
});

module.exports = router;
