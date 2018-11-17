//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// CRUD by Sarah Pickrahn!!!1

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// New functions for POST, PUT, and DELETE routes:

var addRestaurant = function(name, callback) {
  connection.query('INSERT INTO restaurants (name) VALUES (?)', [name], callback);
};

var updateRestaurant = function(newName, name, callback) {
  connection.query('UPDATE restaurants SET name = ? WHERE name = ?', [newName, name], callback);
}

var deleteRestaurant = function(name, callback) {
  connection.query('DELETE FROM restaurants WHERE name = ?', [name], callback);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Here are my new POST, PUT, and DELETE Express API routes:
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
});