const faker = require('faker');
const fs = require('fs');

const photoStream = fs.createWriteStream('./photosCSV.csv');
const photosString = 'id,url,caption';
const baseURL = 'https://s3.amazonaws.com/bunchofpictures/';
let paddedIndex;

photoStream.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

for (let i = 1; i < 1001; i++) {
  paddedIndex = ("0000" + i).slice(-5);
  photosString += '\n' + i + ',' + baseURL + paddedIndex + '.jpg,"' + faker.company.catchPhrase() + '"';
}

photoStream.write(photosString);
photoStream.end();
