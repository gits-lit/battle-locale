import React from 'react';
import OnboardingPage from '../components/OnboardingPage';
import GameMap from './GameMap';
import { connect } from 'react-redux';

import { setPlayerCoords } from '../actions/UserActions';
let name='';

const HomePageContainer = (props) => {
  // HANDLE DEVICE LOCATION AND PLAYER COORDINATES

  const successGetPosition = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    props.setPlayerCoords('name', latitude, longitude);
  }
  
  const errorGetPosition = () => {
    console.error('Error getting position');
  }
  
  const startLocation = () => {
    navigator.geolocation.watchPosition(successGetPosition, errorGetPosition);
  }

  return (
    <>
      <OnboardingPage startLocation={startLocation}/>
      <GameMap />
    </>
  );
};

const mapStateToProps = state => {
  name = state.user.name;
  return {
    name: state.user.name,
  };
};

export default connect(
  mapStateToProps,
  { setPlayerCoords }
)(HomePageContainer);