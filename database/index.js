var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'yumpSF',
  user: 'root'
});

var addRestaurant = function(name, callback) {
  connection.query('INSERT INTO restaurants (name) VALUES (?)', [name], callback);
};

var updateRestaurant = function(newName, name, callback) {
  connection.query('UPDATE restaurants SET name = ? WHERE name = ?', [newName, name], callback);
}

var deleteRestaurant = function(name, callback) {
  connection.query('DELETE FROM restaurants WHERE name = ?', [name], callback);
}

var getDishes = function (restaurantName, callback) {
  var queryStr = 'SELECT * from dishes WHERE restaurant_id IN (SELECT id from restaurants where name = ?)';
  connection.query(queryStr, [restaurantName], callback);
};

var getPhotosForDish = function (restaurantName, dishId, callback) {
  var queryStr = 'SELECT * from dishes_photos WHERE dishes_id = ?';
  connection.query(queryStr, [dishId], callback);
};

var getPhotoData = function (photoId, callback) {
  var queryStr = 'SELECT * FROM photos WHERE id = ?';
  connection.query(queryStr, [photoId], callback);
};

const getRestaurantName = function (restaurantId, callback) {
  let queryStr = 'SELECT name FROM restaurants WHERE id = ?';
  connection.query(queryStr, [restaurantId], callback);
};

module.exports = { addRestaurant, getDishes, getPhotosForDish, getPhotoData, deleteRestaurant, getRestaurantName, updateRestaurant, connection };