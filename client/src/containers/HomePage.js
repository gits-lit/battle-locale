import React, { useEffect, useState } from 'react';
import OnboardingPage from '../components/OnboardingPage';
import Map from '../components/Map';
import { connect } from 'react-redux';
import {
  setPlayerLocation,
  loadPlayer,
} from '../actions/MapActions';

import { setPlayerCoords } from '../actions/UserActions';
let name='';

const HomePageContainer = (props) => {
  // HANDLE DEVICE LOCATION AND PLAYER COORDINATES
  useEffect(() => {
    const gameLoop = () => {
      console.log('Updating');
    }

    console.log('useEffect');
    setInterval(gameLoop, 30000);
  }, []);

  const setPlayerLocation = (map, lat, lng) => {
    props.setPlayerLocation(map, lat, lng);
  }

  // HANDLE LOCATION
  const successGetPosition = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    props.setPlayerCoords('name', latitude, longitude);
    setPlayerLocation(window.map, latitude, longitude);
  }
  
  const errorGetPosition = () => {
    console.error('Error getting position');
  }
  
  const startLocation = () => {
    navigator.geolocation.watchPosition(successGetPosition, errorGetPosition);
  }

  const mapLoad = map => {
    window.map = map;
    loadPlayer(map);
  };

  return (
    <>
      <OnboardingPage startLocation={startLocation}/>
      <Map mapLoad={mapLoad} />
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
  { loadPlayer , setPlayerCoords, setPlayerLocation }
)(HomePageContainer);