'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const dogsSchema = require('./dogs.schema');
const songsSchema = require('./songs.schema');
const ModelInterface = require('./modelInterface');
// 'postgres://localhost:5432/api-app'

const DATABASE_URL = process.env.NODE_URL === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;


// Instantiates our database(create DB is it doesn't)
const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// create DogModel with our Schema
const DogModel = dogsSchema(sequelizeDatabase, DataTypes);
const SongModel = songsSchema(sequelizeDatabase, DataTypes);

DogModel.hasMany(SongModel);
SongModel.belongsTo(DogModel);

module.exports = {
  sequelizeDatabase,
  dogsInterface: new ModelInterface(DogModel),
  songsInterface: new ModelInterface(SongModel),
};
