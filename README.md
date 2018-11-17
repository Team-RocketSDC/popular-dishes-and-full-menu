# YumpSF popular-dishes-and-full-menu Module

> Module displays carousel of top 10 most popular dishes for the given restaurant with image and stats like price and number of reviews from users that mention the dish. Clicking on the Full Menu displays the Full Menu of all dishes for the restaurant. 

## Related Projects
  - https://github.com/YumpSF/reservation-hours
  - https://github.com/YumpSF/Recommended-Reviews-Module
  - https://github.com/YumpSF/overview

## Table of Contents
1. [Setup](#Setup)
2. [Requirements](#requirements)
3. [Development](#development)

## Setup
 - npm install
 - npm run react-dev to run webpack
 - npm start to run server
 - in database/index.js update default user and pw if needed
 - run npm create-database to run schema file and create database
 - run npm seed-database to seed the database (seeds data for 100 restaurants with 15 dishes per restaurant and additional data)
 - to run app for a given restaurant, enter restaurant ids 0 - 99 in URL pathname OR
 - if prefer to call App with restaurantName, can uncomment line 97 in App.jsx and pass down restaurantName as prop in index.jsx

## Requirements
- Node 6.13.0 and additional requirements in package.json file -- to be installed with npm install 
- mySql database 

### Installing Dependencies

From within the root directory:
npm install -g webpack
npm install

## Running Tests
- npm test to run jest unit test suite for all components 

## Acknowledgements
- Thanks to everyone on the YumpSF team for builing awesome modules that bring to life the YumpSF verison of the Yelp restaurant page user experience! 

