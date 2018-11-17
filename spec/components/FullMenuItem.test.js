
import React from 'react';
import { shallow, mount } from 'enzyme';
import FullMenuItem from '../../client/src/components/FullMenuItem.jsx';

describe('FullMenuItem', () => {

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

  it('contains MainDiv, StarIcon and CameraIcon styled components', () => {
    const wrapper = mount(<FullMenuItem menuItem={exampleDish1} restaurantName={exampleRestaurantName} />);
    expect(wrapper.exists('MainDiv')).toBe(true);
    expect(wrapper.exists('StarIcon')).toBe(true);
    expect(wrapper.exists('CameraIcon')).toBe(true);
  });

  it('renders two decimal points for all prices on the dish', () => {
    const wrapper = mount(<FullMenuItem menuItem={exampleDish1} restaurantName={exampleRestaurantName} />);
    const textOfPrice = wrapper.find('.priceCol').text(); // inspect the string/inner text at that element
    // console.log(textOfPrice);
    expect(textOfPrice.slice(textOfPrice.length - 2).length).toBe(2);
    expect(textOfPrice.slice(textOfPrice.length - 2).length).not.toBe(1);
  });

  it('renders two decimal points for prices even if only 1 passed in', () => {
    const wrapper = mount(<FullMenuItem menuItem={exampleDish2} restaurantName={exampleRestaurantName} />);
    const textOfPrice = wrapper.find('.priceCol').text(); // inspect the string/inner text at that element
    // console.log(textOfPrice);
    expect(textOfPrice.slice(textOfPrice.length - 2).length).toBe(2);
    expect(textOfPrice.slice(textOfPrice.length - 2).length).not.toBe(1);
  });

  it('renders singular photo word for 1 photo', () => {
    const wrapper = shallow(<FullMenuItem menuItem={exampleDish2} restaurantName={exampleRestaurantName} />, { disableLifeCycleMethods: true });
    wrapper.setState({ numberOfPhotos: 1, imgurl: 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/3.jpeg' });
    const textOfReviewsAndPhotos = wrapper.find('.reviewsAndPhotos').text();
    const textArr = textOfReviewsAndPhotos.split(' ');
    expect(textArr[6]).toBe('photo');
  });

  it('renders singular photo word for 1 photo', () => {
    const wrapper = shallow(<FullMenuItem menuItem={exampleDish1} restaurantName={exampleRestaurantName} />, { disableLifeCycleMethods: true });
    wrapper.setState({ numberOfPhotos: 4, imgurl: 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/3.jpeg' });
    const textOfReviewsAndPhotos = wrapper.find('.reviewsAndPhotos').text();
    const textArr = textOfReviewsAndPhotos.split(' ');
    expect(textArr[6]).toBe('photos');
  });

  it('renders singular review word for 1 review', () => {
    const wrapper = shallow(<FullMenuItem menuItem={exampleDish1} restaurantName={exampleRestaurantName} />, { disableLifeCycleMethods: true });
    wrapper.setState({ numberOfPhotos: 1, imgurl: 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/3.jpeg' });
    const textOfReviewsAndPhotos = wrapper.find('.reviewsAndPhotos').text();
    const textArr = textOfReviewsAndPhotos.split(' ');
    expect(textArr[2]).toBe('review');
  });

  it('renders plural review word for several reviews', () => {
    const wrapper = shallow(<FullMenuItem menuItem={exampleDish2} restaurantName={exampleRestaurantName} />, { disableLifeCycleMethods: true });
    wrapper.setState({ numberOfPhotos: 4, imgurl: 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/3.jpeg' });
    const textOfReviewsAndPhotos = wrapper.find('.reviewsAndPhotos').text();
    const textArr = textOfReviewsAndPhotos.split(' ');
    expect(textArr[2]).toBe('reviews');
  });




});

