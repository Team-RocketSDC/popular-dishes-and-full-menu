CREATE DATABASE yelprocket;
\c yelprocket

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL 
);

CREATE TABLE dishes (
  id SERIAL NOT NULL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL,
  name VARCHAR(200) NOT NULL,
  price NUMERIC(6,2) NOT NULL,
  description VARCHAR(400) NOT NULL,
  reviews INTEGER NOT NULL 
);

CREATE TABLE dishes_photos (
  id SERIAL NOT NULL PRIMARY KEY,
  photos_id INTEGER NOT NULL,
  dishes_id INTEGER NOT NULL
);

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  url VARCHAR(300) NOT NULL,
  caption VARCHAR(300) NOT NULL
);

CREATE INDEX restaurants_name ON restaurants ( name );
CREATE INDEX dishes_restaurant_id ON dishes (restaurant_id);
CREATE INDEX dishes_photos_dishes_id ON dishes_photos (dishes_id);
