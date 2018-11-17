var faker = require('faker');
var _ = require('underscore');
const db = require('./index.js');

// 100 restaurants
// 15 dishes per restaurant
// 2999 photos
// 1485 dishes
// 3998 entries in dishes_photos

(function () {

  var getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  // SEED restaurant table ********************************************************************
  var randomRestName;
  var randomDishName;
  var randomDishDescription;

  // make an array of 100 unique restaurant names
  var arrOfRestNames = [];

  while (arrOfRestNames.length < 100) {
    randomRestName = faker.lorem.word();
    arrOfRestNames.push(randomRestName);
    arrOfRestNames = _.uniq(arrOfRestNames);
  }

  arrOfRestNames.forEach((name) => {
    const queryStr = 'INSERT INTO restaurants (name) VALUES (?)';
    db.connection.query(queryStr, [name], (error) => {
      if (error) { console.log(error); }
    });
  });

  //  SEED dishes table ***********************************************************************
  var randomNum;
  var randomDescription;
  var precision = 100;
  var randomNumOfReviews;

  var y = 1;
  while (y < 100) {

    var randomDishNames = [];

    while (randomDishNames.length < 15) {
      randomDishNames.push(faker.lorem.word());
      randomDishNames = _.uniq(randomDishNames);
    }

    for (var i = 0; i < randomDishNames.length; i++) {
      randomDescription = faker.lorem.words();
      randomNum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
      randomNumOfReviews = getRandomInt(100);

      const queryStr1 = 'INSERT INTO dishes (restaurant_id, name, price, description, reviews) VALUES (?, ?, ?, ?, ?)';

      db.connection.query(queryStr1, [y, randomDishNames[i], randomNum, randomDescription, randomNumOfReviews], (err) => {
        if (err) {
          console.log(err);
        }
      });

    }
    y++;
  }

  // SEED photos table *************************************************************************

  // create array with urls for the photos
  var filePathBase = 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/';
  var photoURLs = [];
  for (var i = 1; i < 36; i++) {
    photoURLs.push(filePathBase + i + '.jpeg');
  }
  // i have almost 1500 dishes (15 per restaurant, and 100 restaurants), want to be able to have 2 photos per dish, so should make  3000 photo entries
  var randomPhotoURL;
  var caption;

  for (var m = 1; m < 3000; m++) {
    randomPhotoURL = photoURLs[getRandomInt(34)];
    caption = faker.lorem.words();

    db.connection.query('INSERT INTO photos (url, caption) VALUES (?, ?)', [randomPhotoURL, caption], (err) => {
      if (err) {
        throw err;
      }
    });

  }

  // add photo ids 1 - 1484 & dishes ids 1 - 1484
  for (var n = 1; n < 1485; n++) {

    db.connection.query('INSERT INTO dishes_photos (photos_id, dishes_id) VALUES (?, ?)', [n, n], (err) => {
      if (err) {
        throw err;
      }
    });

  }

  for (var b = 1485; b < 3000; b++) {
    const randomInt = getRandomInt(1484);
    db.connection.query('INSERT INTO dishes_photos (photos_id, dishes_id) VALUES (?, ?)', [b, randomInt], (err) => {
      if (err) {
        throw err;
      }
    });
  }

  // add more entries, so that photo_ids point to more than one dish 
  for (var n = 1; n < 1000; n++) {

    db.connection.query('INSERT INTO dishes_photos (photos_id, dishes_id) VALUES (?, ?)', [n, n + 1], (err) => {
      if (err) {
        throw err;
      }
    });

  }

}());