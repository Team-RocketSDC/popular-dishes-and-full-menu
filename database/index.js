const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'yelprocket',
  password: 'elderscrolls',
  port: 5432,
});
client.connect();

function addRestaurant(name, callback) {
  client.query('INSERT INTO restaurants (name) VALUES ($1)', [name], callback);
}

function updateRestaurant(newName, id, callback) {
  client.query('UPDATE restaurants SET name = ($1) WHERE id = ($2)', [newName, id], callback);
}

function deleteRestaurant(id, callback) {
  client.query('DELETE FROM restaurants WHERE restaurant_id = ($1)', [id], callback);
}

function getDishes(restaurantId, callback) {
  const queryStr = 'SELECT * from dishes WHERE restaurant_id = ($1)';
  client.query(queryStr, [restaurantId], callback);
}

function getPhotosForDish(dishId, callback) {
  const queryStr = 'SELECT * from dishes_photos WHERE dishes_id = ($1)';
  client.query(queryStr, [dishId], callback);
}

function getPhotoData(photoId, callback) {
  const queryStr = 'SELECT * FROM photos WHERE id = ($1)';
  client.query(queryStr, [photoId], callback);
}

function getRestaurantName(restaurantId, callback) {
  const queryStr = 'SELECT name FROM restaurants WHERE id = ($1)';
  client.query(queryStr, [restaurantId], callback);
}

module.exports = {
  addRestaurant,
  getDishes,
  getPhotosForDish,
  getPhotoData,
  deleteRestaurant,
  getRestaurantName,
  updateRestaurant,
  client,
};
