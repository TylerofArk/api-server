'use strict';

// requires from the model/index.js file
const { sequelizeDatabase, DogModel } = require('./src/models');
const { start } = require('./src/server');

sequelizeDatabase.sync()
  .then(() => {
    console.log('Successful Connection!');
  })
  .catch(err => console.error(err));

start();
