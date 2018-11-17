//restaurant_id, name, price, description, reviews
const fs = require('fs');
const faker = require('faker');

var stream = fs.createWriteStream('./dishesCSV.csv');
var i = 1;
var dishes = 'restaurant_id,name,price,description,reviews';

stream.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

while (i < 10000001) {
  if (i % 10000 === 0) {
    stream.write(dishes);
    dishes = '';
  }
  dishes += '\n' + i + ',' + faker.commerce.productName() + ',' + '$' + faker.finance.amount(1, 20, 2) + ',' + faker.hacker.phrase() + ',' + faker.random.number({min: 0, max: 100});
  i++;
}

stream.write(dishes);
stream.end();