const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'yumpSF',
  user: 'root',
});

function addRestaurant(name, callback) {
  connection.query('INSERT INTO restaurants (name) VALUES (?)', [name], callback);
}

function updateRestaurant(newName, name, callback) {
  connection.query('UPDATE restaurants SET name = ? WHERE name = ?', [newName, name], callback);
}

function deleteRestaurant(name, callback) {
  connection.query('DELETE FROM restaurants WHERE name = ?', [name], callback);
}

function getDishes(restaurantName, callback) {
  const queryStr = 'SELECT * from dishes WHERE restaurant_id IN (SELECT id from restaurants where name = ?)';
  connection.query(queryStr, [restaurantName], callback);
}

function getPhotosForDish(restaurantName, dishId, callback) {
  const queryStr = 'SELECT * from dishes_photos WHERE dishes_id = ?';
  connection.query(queryStr, [dishId], callback);
}

function getPhotoData(photoId, callback) {
  const queryStr = 'SELECT * FROM photos WHERE id = ?';
  connection.query(queryStr, [photoId], callback);
}

function getRestaurantName(restaurantId, callback) {
  const queryStr = 'SELECT name FROM restaurants WHERE id = ?';
  connection.query(queryStr, [restaurantId], callback);
}

module.exports = {
  addRestaurant,
  getDishes,
  getPhotosForDish,
  getPhotoData,
  deleteRestaurant,
  getRestaurantName,
  updateRestaurant,
  connection,
};
