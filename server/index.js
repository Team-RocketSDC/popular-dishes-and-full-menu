const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.get('/:restaurantId', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/restaurants/:restaurantId', (req, res) => {
  const id = req.params.restaurantId;

  db.getRestaurantName(id, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(results);
    }
  });
});

app.get('/menus/:restaurantName', (request, response) => {
  const { restaurantName } = request.params;
  db.getDishes(restaurantName, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send(results);
    }
  });
});

// the length of results we get back tells us how many different photos
// there are for the given dish at the given restaurant
app.get('/menus/:restaurantName/dishes/:dishId/photos', (request, response) => {
  const { restaurantName, dishId } = request.params;
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
  const photoId = request.params.photoid;
  db.getPhotoData(photoId, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send(results);
    }
  });
});

app.post('/restaurants', (request, response) => {
  db.addRestaurant(request.body.name, (error) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send('success!');
    }
  });
});

app.put('/restaurants', (request, response) => {
  db.updateRestaurant(request.body.newName, request.body.name, (error) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send('success!');
    }
  });
});

app.delete('/restaurants', (request, response) => {
  db.deleteRestaurant(request.body.name, (error) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send('yay!');
    }
  });
});

app.listen(2000, () => {
  console.log('listening on port 2000');
});
