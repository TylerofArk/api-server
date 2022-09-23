'use strict';

const express = require('express');
const router = express.Router();
const { SongModel } = require('../models');

router.get('/songs', async (req, res) => {
  const songs = await songs.findAll();
  res.status(200).json(songs);
});

router.get('/songs/:id', async (req, res) => {
  const songs = await SongModel.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(songs);
});

router.post('/songs', async (req, res, send) => {
  console.log('req body', req.body);
  const newSong = await SongModel.create(req.body);
  res.status(200).send(newSong);
});

router.put('/songs/:id', async (req, res) => {
  const updated = await SongModel.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(`${updated} row(s) updated successfully.`);
});

module.exports = router;
