var express = require('express');
var path = require('path');
var db = require('../database/index.js');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.get('/:restaurant_id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/restaurants/:restaurant_id', (req, res) => {
  var id = req.params.restaurant_id;
  // console.log('restaurantID form server>>', id);

  db.getRestaurantName(id, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      // console.log('results from database>>>', results);
      res.status(200).send(results);
    }
  });
});

app.get('/menus/:restaurantName', (request, response) => {
  // invoke database method and sends back results
  // express & .send already stringifies it, so you don't have to

  // console.log('should be the restaurantname in the URL>>>>', request.params.restaurantName);
  var restaurantName = request.params.restaurantName;

  db.getDishes(restaurantName, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send(results);
    }
  });

});

// the length of results we get back tells us how many different photos there are for the given dish at the given restaurant
app.get('/menus/:restaurantName/dishes/:dishId/photos', (request, response) => {

  var restaurantName = request.params.restaurantName;
  var dishId = request.params.dishId;
  // console.log('dishID being passed in with ajax request>>>', dishId);

  db.getPhotosForDish(restaurantName, dishId, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send(results);
    }
  });

});

// use the id of the first record returned from photos, to search for its url
app.get('/photos/:photoid', (request, response) => {

  var photoId = request.params.photoid;

  db.getPhotoData(photoId, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send(results);
    }
  });

});

app.post('/restaurants', (request, response) => {
  console.log('request.body from post request: ', request.body.name);
  db.addRestaurant(request.body.name, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send('success!');
    }
  });
});

app.put('/restaurants', (request, response) => {
  db.updateRestaurant(request.body.newName, request.body.name, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send('success!');
    }
  });
});

app.delete('/restaurants', (request, response) => {
  db.deleteRestaurant(request.body.name, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send('yay!');
    }
  })
})

app.listen(2000, () => {
  console.log('listening on port 2000');
});