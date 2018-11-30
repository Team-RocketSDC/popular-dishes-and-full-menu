// this.props.dish is a dish object 

import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import axios from 'axios';

const MainDiv = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`;
MainDiv.displayName = 'MainDiv';


const ImageWrapper = styled.div`
  height: 66%;
  position: relative;
  z-index: 0;
`;
ImageWrapper.displayName = 'ImageWrapper';


const Price = styled.div`
  color: white;
  font-weight: bold;
  font-size: 13px;
  background: rgba(20, 20, 20, 0.75);
  font-family: arial;
  width: 23%;
  text-align: center;
  padding: 3px;
  position: absolute;
  right: 3%;
  bottom: 5%;
  z-index: 5;
  border-radius: 3px;
  `;
Price.displayName = 'Price';


const Image = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-style: thin;
  border-color: transparent;
  position: relative;
  z-index: 1;
  `;
Image.displayName = 'Image';


const DetailWrapper = styled.div`
  width: 100%;
  height: 34%;
  padding-left: 3%;
  vertical-align: center;
  font-family: arial;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-size: 16px;

  .numPhotosReviews {
    color: #666666;
    font-size: 14px;
  }
`;
DetailWrapper.displayName = 'DetailWrapper';

class PopularDish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPhotos: 0,
      imgurl: '',
    };
    this.getPhotoData = this.getPhotoData.bind(this);
  }

  getPhotoData() {
    axios.get(`/menus/${this.props.restaurantName}/dishes/${this.props.dish.id}/photos`)
      .then(data => {
        this.setState({ numberOfPhotos: data.data.length });
        return axios.get(`/photos/${data.data[0].photos_id}`)
          .then(photoData => {
            this.setState({ imgurl: photoData.data[0].url });
          });

      });
  }

  // REFACTORED FROM USING AJAX..
  // $.ajax(`/menus/${this.props.restaurantName}/dishes/${this.props.dish.id}/photos`, {
  //   method: 'GET',
  //   success: (data) => {
  //     // console.log('data>>>>', data);
  //     this.setState({ numberOfPhotos: data.length });
  //     // console.log('photos_id from first record>>>,', data[0].photos_id);
  //     $.ajax(`/photos/${data[0].photos_id}`, {
  //       success: (photoData) => {
  //         // console.log('photoData>>>', photoData);
  //         this.setState({ imgurl: photoData[0].url, impgCaption: photoData[0].caption });
  //       },
  //       error: () => {
  //         console.log('error from second ajax');
  //       }
  //     });
  //   },
  //   error: () => {
  //     console.log('error from getPhotoData 1st ajax request');
  //   }
  // });

  componentDidMount() {
    this.getPhotoData();
  }

  render() {

    const { dish } = this.props;

    let photoWord = 'photos';
    if (this.state.numberOfPhotos === 1) {
      photoWord = 'photo';
    }
    let reviewsWord = 'reviews';
    if (dish.reviews === 1) {
      reviewsWord = 'review';
    }

    let priceWithZero = '' + dish.price;
    if (dish.price.toString().length === 3) {
      priceWithZero = '' + dish.price + '0';
    }

    return (
      <MainDiv>
        <ImageWrapper>
          <Image src={this.state.imgurl} alt="picture of food"></Image>
          <Price>{'$' + priceWithZero}</Price>
        </ImageWrapper>
        <DetailWrapper>
          <b>{dish.name[0].toUpperCase() + dish.name.slice(1)}</b>
          <div className='numPhotosReviews'>
            {this.state.numberOfPhotos + " " + photoWord + " " + "\u00B7"} {dish.reviews + ' ' + reviewsWord}
          </div>
        </DetailWrapper>
      </MainDiv>
    );
  }
}

export default PopularDish;