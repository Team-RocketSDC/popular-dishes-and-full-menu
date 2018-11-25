CREATE KEYSPACE yelprocket WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE yelprocket;

CREATE TABLE restaurants (
  id BIGINT PRIMARY KEY,
  name VARCHAR 
);

CREATE TABLE restaurants_by_name (
  name VARCHAR,
  id BIGINT,
  PRIMARY KEY (name, id) 
);

CREATE TABLE dishes (
  id BIGINT PRIMARY KEY,
  restaurant_id BIGINT,
  name VARCHAR,
  price DECIMAL,
  description VARCHAR,
  reviews BIGINT 
);

CREATE TABLE dishes_by_restaurant_id (
  restaurant_id BIGINT,
  dish_id BIGINT,
  PRIMARY KEY (restaurant_id, dish_id)
);

CREATE TABLE photos_by_dish_id (
  dish_id BIGINT,
  photo_id BIGINT,
  PRIMARY KEY (dish_id, photo_id)
);

CREATE TABLE photos (
  id BIGINT PRIMARY KEY,
  url VARCHAR,
  caption VARCHAR
);

