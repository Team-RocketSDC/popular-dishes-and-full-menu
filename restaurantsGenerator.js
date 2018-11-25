//csv generating file for table restaurants
//need this file to write into csv file

const faker = require('faker');
const fs = require('fs');
const stream = fs.createWriteStream('./restaurantsCSV.csv');

stream.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

var restaurantCSV = 'Name';
var i = 1;
while (i < 10000001) {
  if (i % 10000 === 0) {
    stream.write(restaurantCSV);
    restaurantCSV = '';
  }
  restaurantCSV += '\n' + '"' + faker.company.companyName() + '"';
  i++;
}
stream.write(restaurantCSV);
stream.end();
