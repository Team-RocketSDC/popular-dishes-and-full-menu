import React from 'react';
import PopularDish from './PopularDish.jsx';
import Modal from './FullMenuModal.jsx';
import initialDishData from '../initialData.js';
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';

const FullMenu = styled.div`
  font-family: arial;
  font-size: 14px;
  color: #0073bb;
  vertical-align: bottom;
  /* position: fixed; */
  /* right: 75px;     */
  `;
FullMenu.displayName = 'FullMenu';

const TitleMenuContainer = styled.div`
  display: flex;
  align-items: flex-end;
  /* position: fixed; */
  flex-direction: row;
  justify-content: space-between;
`;
TitleMenuContainer.displayName = 'TitleMenuContainer';

const FullMenuAndArrowsContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
const ArrowsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: white;
`;
const LeftArrow = styled.button`
  height: 20px;
  width: 30px;
  padding-left: 2px;
  border: none;
  outline: none;
`;
LeftArrow.displayName = 'LeftArrow';
const RightArrow = styled.button`
  height: 20px;
  width: 30px;
  border: none;
  /* position: fixed; */
  /* right: 40px; */
  outline: none;
`;
RightArrow.displayName = 'RightArrow';


const Title = styled.div`
  text-align: left;
  padding-left: 10px;
  vertical-align: bottom;
  font-size: 18px;
  color: #d32323;
  font-family: verdana;
  font-weight: bold;
`;
Title.displayName = 'Title';

const MainContainer = styled.div`
  padding-left: 15px;
    .hoverOn {
      text-decoration: underline;
    }
    .hoverOff {
      text-decoration: none;
    }
`;
MainContainer.displayName = 'MainContainer';

const PopularDishesContainer = styled.div`
  padding-top: 30px;
  vertical-align: middle;
  display: inline-block;
  width: 98%;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  ::-webkit-scrollbar {display:none;}
  `;
PopularDishesContainer.displayName = 'PopularDishesContainer';

const PopularDishSpanHolder = styled.div`
  height: 175px;
  width: 175px;
  margin: 10px;
  display: inline-block;
  border-style: solid;
  border-radius: 5px;
  border-color: #999999;
  border-width: .5px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantName: 'est',
      restaurantId: '',
      dishes: initialDishData,
      top10: initialDishData,
      show: false,
      fullMenuHover: false,
    };

    this.updateState = this.updateState.bind(this);
    this.getDishes = this.getDishes.bind(this);
    this.getRestaurantId = this.getRestaurantId.bind(this);
    this.getRestaurantName = this.getRestaurantName.bind(this);
    this.getTop10 = this.getTop10.bind(this);
    this.scroll = this.scroll.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setTrueFullMenuHover = this.setTrueFullMenuHover.bind(this);
    this.setFalseFullMenuHover = this.setFalseFullMenuHover.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  getRestaurantId() {
    const restId = window.location.pathname.slice(1);
    return new Promise((resolve) => {
      this.setState({
        restaurantId: restId,
      }, () => resolve());
    });
  }

  getRestaurantName() {
    const { restaurantId } = this.state;
    return axios.get(`/restaurants/${restaurantId}`)
      .then((data) => {
        this.setState({ restaurantName: data.data[0].name });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDishes() {
    const { restaurantId } = this.state;
    return axios.get(`/menus/${restaurantId}`)
      .then((data) => {
        this.setState({
          dishes: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTop10() {
    const { dishes } = this.state;
    const compare = (a, b) => {
      const reviewsA = a.reviews;
      const reviewsB = b.reviews;

      let comparison = 0;
      if (reviewsA > reviewsB) {
        comparison = 1;
      } else if (reviewsA < reviewsB) {
        comparison = -1;
      }
      return comparison;
    };
    const sortedDishes = dishes.sort(compare).reverse();
    this.setState({
      top10: sortedDishes.slice(0, 10),
    });
  }

updateState() {
    this.getRestaurantId()
      .then(() => this.getRestaurantName())
      .then(() => this.getDishes())
      .then(() => this.getTop10())
      .catch(console.log);
  }

  // * methods for styling ////////////////////////////////////
  scroll(direction) {
    let far = $('.popDishesContainer').width() / 2 * direction;
    let pos = $('.popDishesContainer').scrollLeft() + far;
    $('.popDishesContainer').animate({ scrollLeft: pos }, 350)
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false, fullMenuHover: false });
  }

  setTrueFullMenuHover() {
    this.setState({ fullMenuHover: true });
  }

  setFalseFullMenuHover() {
    this.setState({ fullMenuHover: false });
  }


  render() {
    if (this.state.show) {
      return (
        <MainContainer id='main'>
          <TitleMenuContainer>
            <Title>Popular Dishes</Title>
            <FullMenu onClick={this.showModal} className={this.state.fullMenuHover ? 'hoverOn' : 'hoverOff'}>Full Menu</FullMenu>
            <RightArrow onClick={this.scroll.bind(null, -1)}><img src="https://s3.us-east-2.amazonaws.com/yelpsfphotos/scrollLeft.png" alt="scroll right icon" width="100%" height="100%"></img></RightArrow>
            <LeftArrow className="leftArrow" onClick={this.scroll.bind(null, 1)}><img src="https://s3.us-east-2.amazonaws.com/yelpsfphotos/scrollRight.png" alt="scroll left icon" width="100%" height="100%"></img></LeftArrow>
          </TitleMenuContainer>

          <PopularDishesContainer className='popDishesContainer'>
            {this.state.top10.map((dishObj) => (
              <PopularDishSpanHolder key={dishObj.id} id={dishObj.id} className='popularDishSpan'>
                <PopularDish restaurantName={this.state.restaurantId} dish={dishObj} />
              </PopularDishSpanHolder>)
            )}
          </PopularDishesContainer>

          <Modal show={this.state.show} handleClose={this.hideModal} restaurantName={this.state.restaurantId} fullMenu={this.state.dishes} />

        </MainContainer>
      );
    }
    return (
      <MainContainer id="main">
        <TitleMenuContainer>
          <Title>Popular Dishes</Title>
          <FullMenuAndArrowsContainer>
            <FullMenu className="fullMenu" onClick={this.showModal} onMouseEnter={this.setTrueFullMenuHover} onMouseLeave={this.setFalseFullMenuHover} className={this.state.fullMenuHover ? 'hoverOn' : 'hoverOff'}>Full Menu</FullMenu>
            <ArrowsContainer>
              <RightArrow onClick={this.scroll.bind(null, -1)}><img src="https://s3.us-east-2.amazonaws.com/yelpsfphotos/scrollLeft.png" alt="scroll right icon" width="100%" height="100%"></img></RightArrow>
              <LeftArrow onClick={this.scroll.bind(null, 1)}><img src="https://s3.us-east-2.amazonaws.com/yelpsfphotos/scrollRight.png" alt="scroll left icon" width="100%" height="100%"></img></LeftArrow>
            </ArrowsContainer>
          </FullMenuAndArrowsContainer>

        </TitleMenuContainer>

        <PopularDishesContainer className='popDishesContainer'>
          {this.state.top10.map((dishObj) => (
            <PopularDishSpanHolder key={dishObj.id} id={dishObj.id} className='popularDishSpan'>
              <PopularDish restaurantName={this.state.restaurantName} dish={dishObj} />
            </PopularDishSpanHolder>)
          )}
        </PopularDishesContainer>

      </MainContainer>
    );

  }
}
export default App;
