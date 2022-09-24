'use strict';

const express = require('express');
const router = express.Router();
const { songsInterface } = require('../models');

router.get('/songs', async (req, res) => {
  const songs = await songsInterface.read();
  res.status(200).json(songs);
});

router.get('/songs/:id', async (req, res) => {
  const { id } = req.params;
  const songs = await songsInterface.read(id);
  res.status(200).json(songs);
});

router.post('/songs', async (req, res, send) => {
  console.log('req body', req.body);
  const newSong = await songsInterface.create(req.body);
  res.status(200).send(newSong);
});

router.put('/songs/:id', async (req, res) => {
  const updated = await songsInterface.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(`${updated} updated successfully.`);
});

router.delete('/songs/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await songsInterface.delete(id);
  res.status(200).send(`${deleted} deleted successfully`);
});

module.exports = router;
