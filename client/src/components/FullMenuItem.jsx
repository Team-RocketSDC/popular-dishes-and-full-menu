import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  border-top-style: solid;
  border-top-width: thin;

  .menuItemCol{
    width: 80%;
    font-size: 12px;
    line-height: 1.5em;
  }

  .imgCol{
    width: 10%;
    img {
      width: 80%;
      height: auto;
      padding: 7%;
    }
  }

  .priceCol{
    width: 10%;
    text-align: right;
    position: relative;
    top: 1%;
  }
`;
MainDiv.displayName = 'MainDiv';


const StarIcon = styled.img`
  width: 2.5%;
  height: auto;
`;
StarIcon.displayName = 'StarIcon';


const CameraIcon = styled.img`
  width: 3%;
  height: auto;
  padding-left: 2%;
`;
CameraIcon.displayName = 'CameraIcon';


class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPhotos: 0,
      imgurl: '',
      imgCaption: ''
    };
    this.getPhotoData = this.getPhotoData.bind(this);
  }

  getPhotoData() {
    $.ajax(`http://localhost:2000/menus/${this.props.restaurantName}/dishes/${this.props.menuItem.id}/photos`, {
      method: 'GET',
      success: (data) => {
        // console.log('data>>>>', data);
        this.setState({ numberOfPhotos: data.length });
        // console.log('photos_id from first record>>>,', data[0].photos_id);
        $.ajax(`http://localhost:2000/photos/${data[0].photos_id}`, {
          success: (photoData) => {
            // console.log('photoData>>>', photoData);
            this.setState({ imgurl: photoData[0].url, impgCaption: photoData[0].caption });
          },
          error: () => {
            console.log('error from second ajax');
          }
        });
      },
      error: () => {
        console.log('error from getPhotoData 1st ajax request');
      }
    });
  }

  componentDidMount() {
    this.getPhotoData();
  }

  render() {
    let priceWithZero = '' + this.props.menuItem.price;

    if (this.props.menuItem.price.toString().length === 3) {
      priceWithZero = '' + this.props.menuItem.price + '0';
    }

    let photoWord = 'photos';
    if (this.state.numberOfPhotos === 1) {
      photoWord = 'photo';
    }
    let reviewsWord = 'reviews';
    if (this.props.menuItem.reviews === 1) {
      reviewsWord = 'review';
    }

    return (
      <MainDiv>
        <div className="menuItemCol imgCol">
          <img src={this.state.imgurl} alt='menuItem photo'></img>
        </div>
        <div className="menuItemCol">
          <div><b>{this.props.menuItem.name[0].toUpperCase() + this.props.menuItem.name.slice(1)}</b></div>
          <div>{this.props.menuItem.description[0].toUpperCase() + this.props.menuItem.description.slice(1) + '.'}</div>
          <div className="reviewsAndPhotos"><StarIcon src="https://s3.us-east-2.amazonaws.com/yumpsfphotos/small_0%403x.png" alt="reviews icon"></StarIcon> {this.props.menuItem.reviews + ' ' + reviewsWord + ' '} <CameraIcon src="https://s3.us-east-2.amazonaws.com/yumpsfphotos/camericon2.png" alt="camera icon"></CameraIcon> {this.state.numberOfPhotos + ' ' + photoWord + ' '} </div>
        </div>
        <div className="menuItemCol priceCol"><b>{'$' + priceWithZero}</b></div>
      </MainDiv>
    );
  }
}

export default MenuItem;