//this script will create an array of urls to the images i want, save to a file as a list of 1000 unique picture urls
//need images of size: 175 px width and 120 px height
const path = require('path');
const fs = require('fs');
const request = require('request');
const sprintf = require('sprintf-js').sprintf;
const imageDirectory = 'imageDirectory';
const url = 'https://loremflickr.com/175/120/food';
var timeout = 0;

for (var i = 1; i <= 1000; i++) {
  let imageName = sprintf('%05s.jpg', i); //image format is 00001.jpg
  let imagePath = path.join(imageDirectory, imageName);
  setTimeout(() => {
    let stream = request(url).pipe(fs.createWriteStream(imagePath));
    stream.on('finish', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`yay Image ${i} written to images/${imageName}`);
      }
    })
  }, timeout);
  timeout += 2000;
}