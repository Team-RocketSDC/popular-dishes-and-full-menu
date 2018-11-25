// 100 restaurants
// 10-15 dishes per restaurant
// 2-3 pics per dish
const fs = require('fs');
const faker = require('faker');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


const stream = fs.createWriteStream('./dishesCSV.csv');
const dishesPhotosStream = fs.createWriteStream('./dishes_photosCSV.csv');
const dishesByRestIdStream = fs.createWriteStream('./dishes_by_rest_idCSV.csv');
const restaurantStream = fs.createWriteStream('./restaurantsCSV.csv');


let restId = 1;
let dishId = 1;
let restaurantString = 'id,name';
let dishes = 'id,restaurant_id,name,price,description,reviews';
let dishesPhotosStreamString = 'photos_id,dishes_id';
let dishesByRestIdString = 'restaurant_id,dish_id';

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

dishesByRestIdStream.on('error', (err) => {
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
    dishesByRestIdStream.write(dishesByRestIdString);
    dishesByRestIdString = '';
    restaurantStream.write(restaurantString);
    restaurantString = '';
  }

  restaurantString += '\n' + restId + ',"' + faker.company.companyName() + '"';

  //10-15 dishes per restaurant (id)
  for (var j = 1; j <= getRandomInt(10, 16); j++) {
    dishes += '\n' + dishId + ',' + restId + ',' + faker.commerce.productName() + ',' + faker.finance.amount(1, 20, 2) + ',"' + faker.hacker.phrase() + '",' + faker.random.number({min: 0, max: 100});
    dishesByRestIdString += '\n' + restId + ',' + dishId;
    //2-3 pics per dish
    for (var k = 1; k < getRandomInt(3, 5); k++) {
      //data has form: photoId, dishId -> 246, 946
      dishesPhotosStreamString += '\n' + getRandomInt(1, 1001) + ',' + dishId;
    }
    dishId++;
  }
  restId++;
}

stream.write(dishes, () => {
  stream.end();
});
dishesPhotosStream.write(dishesPhotosStreamString, () => {
  dishesPhotosStream.end();
});
dishesByRestIdStream.write(dishesByRestIdString, () => {
  dishesByRestIdStream.end();
});
restaurantStream.write(restaurantString, () => {
  restaurantStream.end();
});
