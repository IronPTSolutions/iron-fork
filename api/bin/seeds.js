require('dotenv').config();

const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant.model');
const restaurantsData = require('../data/restaurants.json');

require('../configs/db.config');


mongoose.connection.once('open', () => {
  console.info(`Successfully connected to the database ${mongoose.connection.db.databaseName}`);
  mongoose.connection.db.dropCollection('restaurants')
    .then(() => {
      console.info('Dropped restaurants collection');
      return Restaurant.create(restaurantsData);
    })
    .then((restaurants) => console.info(`- ${restaurants.length} restaurants created`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))
});
