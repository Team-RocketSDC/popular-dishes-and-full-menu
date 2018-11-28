// 100 restaurants
// 10-15 dishes per restaurant
// 2-3 pics per dish
const fs = require('fs');
const faker = require('faker');

// ///////generate photo urls////////////////////////////////////
const photoStream = fs.createWriteStream('./photosCSV.csv');
let photosString = 'url,caption';
let baseURL = 'https://s3.amazonaws.com/bunchofpictures/';
let paddedIndex;

photoStream.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

for (let i = 1; i < 1001; i += 1) {
  paddedIndex = ('0000' + i).slice(-5);
  photosString += '\n' + baseURL + paddedIndex + '.jpg,"' + faker.company.catchPhrase() + '"';
}

photoStream.write(photosString);
photoStream.end();
// //////////////////////////////////////////////////////////////

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


const stream = fs.createWriteStream('./dishesCSV.csv');
const dishesPhotosStream = fs.createWriteStream('./dishes_photosCSV.csv');
const restaurantStream = fs.createWriteStream('./restaurantsCSV.csv');


let restId = 1;
let dishId = 1;
let restaurantString = 'name';
let dishes = 'restaurant_id,name,price,description,reviews';
let dishesPhotosStreamString = 'photos_id,dishes_id';

restaurantStream.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

stream.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

dishesPhotosStream.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

while (restId <= 10000000) {
  if (restId % 10000 === 0) {
    console.log('writing up to restId ', restId);

    stream.write(dishes);
    dishes = '';
    dishesPhotosStream.write(dishesPhotosStreamString);
    dishesPhotosStreamString = '';
    restaurantStream.write(restaurantString);
    restaurantString = '';
  }

  restaurantString += '\n' + '"' + faker.company.companyName() + '"';

  // 10-15 dishes per restaurant (id)
  for (let j = 1; j <= getRandomInt(10, 16); j += 1) {
    dishes += '\n' + restId + ',' + faker.commerce.productName() + ',' + faker.finance.amount(1, 20, 2) + ',"' + faker.hacker.phrase() + '",' + faker.random.number({min: 0, max: 100});
    // 2-3 pics per dish
    for (let k = 1; k < getRandomInt(3, 5); k += 1) {
      // data has form: photoId, dishId -> 246, 946
      dishesPhotosStreamString += '\n' + getRandomInt(1, 1001) + ',' + dishId;
    }
    dishId += 1;
  }
  restId += 1;
}

stream.write(dishes, () => {
  stream.end();
});
dishesPhotosStream.write(dishesPhotosStreamString, () => {
  dishesPhotosStream.end();
});
restaurantStream.write(restaurantString, () => {
  restaurantStream.end();
});
