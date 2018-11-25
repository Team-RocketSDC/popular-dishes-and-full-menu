//restaurant_id, name, price, description, reviews
const fs = require('fs');
const faker = require('faker');

var stream = fs.createWriteStream('./dishes_photosCSV.csv');
var i = 1;
var data = 'photos_id,dishes_id';

stream.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

while (dishes_id <= 10000001) {
  if (i % 10000 === 0) {
    stream.write(data);
    data = '';
  }
  data += '\n' + ;
  i++;
}

stream.write(data);
stream.end();