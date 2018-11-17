import React from 'react';
import { shallow, mount } from 'enzyme';
import PopularDish from '../../client/src/components/PopularDish.jsx';

describe('PopularDish', () => {
  const exampleDish1 = {
    description: "minima inventore possimus",
    id: 1458,
    name: 'est',
    price: 3.25,
    restaurant_id: 98,
    reviews: 1,
  };

  const exampleDish2 = {
    description: "minima inventore possimus",
    id: 1458,
    name: 'est',
    price: 3.2,
    restaurant_id: 98,
    reviews: 80,
  };

  const exampleRestaurantName = 'eligendi';

  it('contains MainDiv, ImageWrapper, DetailWrapper, Image and Price elements', () => {
    const wrapper = mount(<PopularDish dish={exampleDish1} restaurantName={exampleRestaurantName} />);
    expect(wrapper.exists('MainDiv')).toBe(true);
    expect(wrapper.exists('ImageWrapper')).toBe(true);
    expect(wrapper.exists('Price')).toBe(true);
    expect(wrapper.exists('Image')).toBe(true);
    expect(wrapper.exists('DetailWrapper')).toBe(true);
  });

  it('renders two decimal points for all prices on the dish', () => {
    const wrapper = mount(<PopularDish dish={exampleDish1} restaurantName={exampleRestaurantName} />);
    const textOfPrice = wrapper.find('Price').text(); // inspect the string/inner text at that element
    // console.log(textOfPrice);
    expect(textOfPrice.slice(textOfPrice.length - 2).length).toBe(2);
    expect(textOfPrice.slice(textOfPrice.length - 2).length).not.toBe(1);
  });

  it('renders two decimal points for prices even if only 1 passed in', () => {
    const wrapper = mount(<PopularDish dish={exampleDish2} restaurantName={exampleRestaurantName} />);
    const textOfPrice = wrapper.find('Price').text(); // inspect the string/inner text at that element
    // console.log(textOfPrice);
    expect(textOfPrice.slice(textOfPrice.length - 2).length).toBe(2);
    expect(textOfPrice.slice(textOfPrice.length - 2).length).not.toBe(1);
  });

  it('renders singular photo word for 1 photo', () => {
    const wrapper = shallow(<PopularDish dish={exampleDish2} restaurantName={exampleRestaurantName} />, { disableLifeCycleMethods: true });
    wrapper.setState({ numberOfPhotos: 1, imgurl: 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/3.jpeg' });
    const textOfPhotosDiv = wrapper.find('.numPhotosReviews').text();
    const textArr = textOfPhotosDiv.split(' ');
    expect(textArr[1]).toBe('photo');
  });

  it('renders plural photo word for several photos', () => {
    const wrapper = shallow(<PopularDish dish={exampleDish2} restaurantName={exampleRestaurantName} />, { disableLifeCycleMethods: true });
    wrapper.setState({ numberOfPhotos: 4, imgurl: 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/3.jpeg' });
    const textOfPhotosDiv = wrapper.find('.numPhotosReviews').text();
    const textArr = textOfPhotosDiv.split(' ');
    expect(textArr[1]).toBe('photos');
  });

  it('renders singular review word for 1 review', () => {
    const wrapper = shallow(<PopularDish dish={exampleDish2} restaurantName={exampleRestaurantName} />, { disableLifeCycleMethods: true });
    wrapper.setState({ numberOfPhotos: 1, imgurl: 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/3.jpeg' });
    const textOfPhotosDiv = wrapper.find('.numPhotosReviews').text();
    const textArr = textOfPhotosDiv.split(' ');
    expect(textArr[4]).toBe('reviews');
  });

  it('renders plural reviews word for more than 1 review', () => {
    const wrapper = shallow(<PopularDish dish={exampleDish1} restaurantName={exampleRestaurantName} />, { disableLifeCycleMethods: true });
    wrapper.setState({ numberOfPhotos: 1, imgurl: 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/3.jpeg' });
    const textOfPhotosDiv = wrapper.find('.numPhotosReviews').text();
    const textArr = textOfPhotosDiv.split(' ');
    expect(textArr[4]).toBe('review');
  });

});
