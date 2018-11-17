import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

// if what gets passed in is a restaurant id, can easily pass that down and just update the state with the restaurant name
ReactDOM.render(<App restaurantName='nulla' />, document.getElementById('PopularDishes'));
