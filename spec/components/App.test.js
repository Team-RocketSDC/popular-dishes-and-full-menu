import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../client/src/components/App.jsx';
import PopularDish from '../../client/src/components/PopularDish.jsx';
import Modal from '../../client/src/components/FullMenuModal.jsx';

describe('App', () => {

  it('renders ten <PopularDish /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(PopularDish)).toHaveLength(10);
  });

  it('renders a Modal component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.contains(Modal)).toBe(true);
  });

  it('has a FullMenu styled component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.exists('FullMenu')).toBe(true);
  });

  it('has a Title styled component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.exists('TitleMenuContainer')).toBe(true);
    expect(wrapper.exists('Title')).toBe(true);

  });

  it('has a mainContainer styled component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.exists('MainContainer')).toBe(true);
  });

  it('has a PopularDishesContainer styled component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.exists('PopularDishesContainer')).toBe(true);
  });

  it('has a component with the className hoverOff when Full Menu has not been hovered over', () => {
    const wrapper = mount(<App />);
    // expect(wrapper.exists('.hoverOn')).toBe(true);
    expect(wrapper.exists('.hoverOff')).toBe(true);
    expect(wrapper.exists('.hoverOn')).toBe(false);

  });

  it('has a component with the className hoverOn when Full Menu has been hovered over', () => {
    const wrapper = mount(<App />);
    expect(wrapper.exists('.hoverOff')).toBe(true);
    expect(wrapper.exists('.hoverOn')).toBe(false);
    wrapper.find('FullMenu').simulate('mouseEnter');
    expect(wrapper.state('fullMenuHover')).toBe(true);
    expect(wrapper.exists('.hoverOn')).toBe(true);
    expect(wrapper.exists('.hoverOff')).toBe(false);
    wrapper.find('FullMenu').simulate('mouseLeave');
    expect(wrapper.state('fullMenuHover')).toBe(false);
    expect(wrapper.exists('.hoverOff')).toBe(true);
    expect(wrapper.exists('.hoverOn')).toBe(false);
  });

  it('updates state of show to true when Full Menu is clicked', () => {
    const wrapper = mount(<App />);
    expect(wrapper.state('show')).toBe(false);
    wrapper.find('FullMenu').simulate('click');
    expect(wrapper.state().show).toBe(true);
  });

  it('has a span with the className popularDishSpan', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists('.popularDishSpan')).toBe(true);
    expect(wrapper.exists('.populardish')).toBe(false);
    expect(wrapper.find('.unpopularDish').exists()).toBe(false);
  });

  it('has a state property of dishes with a initial length of 10', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().dishes).toHaveLength(10);
    expect(wrapper.state('dishes')).toHaveLength(10);
  });

  it('has a state property of top10 with an initial length of 10', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().top10).toHaveLength(10);
    expect(wrapper.state('top10')).toHaveLength(10);
  });

  it('has a state property of restaurantName with value of the restaurantName property that is passed in', () => {
    const wrapper = shallow(<App restaurantName='est' />);
    expect(wrapper.state().restaurantName).toBe('est');
    expect(wrapper.state().restaurantName).not.toBe('iure');
  });

  it('should have a property with passed in value, when property and value are passed in', () => {
    const wrapper = shallow(<App restaurantName='iure' />);
    expect(wrapper.instance().props.restaurantName).toBe('iure');
    expect(wrapper.instance().props.restaurantName).not.toBe('nulla');
  });

  it('should change state of show to true when showModal is called & false when hideModal is called', () => {
    const wrapper = shallow(<App restaurantName='iure' />);
    const instance = wrapper.instance();
    instance.showModal();
    expect(wrapper.state('show')).toBe(true);
    instance.hideModal();
    expect(wrapper.state('show')).toBe(false);
  });

  it('should change state of fullMenuHover to true when setTrueFullMenuHover is called & false when setFalseFullMenuHover is called', () => {
    const wrapper = shallow(<App restaurantName='iure' />);
    const instance = wrapper.instance();
    instance.setTrueFullMenuHover();
    expect(wrapper.state('fullMenuHover')).toBe(true);
    instance.hideModal();
    expect(wrapper.state('fullMenuHover')).toBe(false);
  });

  // IN PROGRESS ...
  // it('should on componentDidMount, fetch Dishes and update state.dishes', async () => {
  //   const resp = {
  //     data: [
  //       { id: 1454, restaurant_id: 97, name: "reprehenderit", price: 8.27, description: "quae corrupti et", reviews: 88 },
  //       { id: 1444, restaurant_id: 97, name: "qui", price: 6.81, description: "quae est ea", reviews: 85 },
  //       { id: 1445, restaurant_id: 97, name: "maxime", price: 5.43, description: "fuga nam quis", reviews: 82 },
  //       { id: 1449, restaurant_id: 97, name: "voluptatibus", price: 4.39, description: "dolore quasi recusandae", reviews: 81 },
  //       { id: 1441, restaurant_id: 97, name: "iusto", price: 6.98, description: "consequatur iure similique", reviews: 71 },
  //       { id: 1452, restaurant_id: 97, name: "vel", price: 3.66, description: "quam qui similique", reviews: 67 },
  //       { id: 1450, restaurant_id: 97, name: "culpa", price: 2.28, description: "itaque aut officia", reviews: 55 },
  //       { id: 1443, restaurant_id: 97, name: "repellendus", price: 6.23, description: "voluptatem veniam harum", reviews: 45 },
  //       { id: 1442, restaurant_id: 97, name: "eos", price: 3.2, description: "unde sequi dolor", reviews: 32 },
  //       { id: 1447, restaurant_id: 97, name: "accusamus", price: 3.17, description: "et laboriosam eos", reviews: 31 },
  //       { id: 1448, restaurant_id: 97, name: "similique", price: 3.89, description: "sunt dolor aperiam", reviews: 29 },
  //       { id: 1455, restaurant_id: 97, name: "necessitatibus", price: 4.98, description: "sunt aut sit", reviews: 16 },
  //       { id: 1446, restaurant_id: 97, name: "consequatur", price: 1.54, description: "necessitatibus at nulla", reviews: 9 },
  //       { id: 1453, restaurant_id: 97, name: "amet", price: 3.29, description: "asperiores natus dolor", reviews: 7 }
  //     ]
  //   };
  //   axios.get.mockResolvedValue(resp);
  //   const component = create(<App />);
  //   const instance = component.getInstance();
  //   await instance.componentDidMount();
  //   console.log(instance.state.dishes); // should return mocked data but does not!
  // });

});












