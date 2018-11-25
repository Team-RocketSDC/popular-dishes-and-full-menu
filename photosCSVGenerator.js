const faker = require('faker');
const fs = require('fs');
const stream = fs.createWriteStream('./photosCSV.csv');
var photosString = 'id,url,caption';
var baseURL = 'https://s3.amazonaws.com/bunchofpictures/';
var paddedIndex;

stream.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

for (var i = 1; i < 1001; i++) {
  paddedIndex = ("0000" + i).slice(-5);
  photosString += '\n' + i + ',' + baseURL + paddedIndex + '.jpg,"' + faker.company.catchPhrase() + '"';
}

stream.write(photosString);
stream.end();