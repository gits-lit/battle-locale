import React, { useEffect, useState } from 'react';
import OnboardingPage from '../components/OnboardingPage';
import Map from '../components/Map';
import { connect } from 'react-redux';
import {pines, daisies, birches} from '../assets/constants.js';

import {
  setPlayerLocation,
  loadTrees,
  loadTomes,
} from '../actions/MapActions';
import { getClosestSpellTome, getClosestUser } from '../actions/ClosestActions';
import { setPlayerCoords } from '../actions/UserActions';


const HomePageContainer = (props) => {
  const [flyTo, setFlyTo] = useState(true);

  // HANDLE DEVICE LOCATION AND PLAYER COORDINATES
  useEffect(() => {
    const gameLoop = () => {
      console.log('Updating');
    }

    console.log('useEffect');
    setInterval(gameLoop, 30000);
  }, []);

  const setPlayerLocation = (map, lat, lng) => {
    if (flyTo) {
    map.flyTo({
      center: [
      lng,
      lat
      ],
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
      setFlyTo(false);
    }
    props.setPlayerLocation(map, lat, lng);
  }

  // HANDLE LOCATION
  const successGetPosition = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    props.setPlayerCoords(props.name, latitude, longitude);
    props.getClosestSpellTome(props.name);
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
    loadTrees(map, pines, birches, daisies);
    props.loadTomes(map);
  };

  return (
    <>
      <OnboardingPage startLocation={startLocation}/>
      <Map mapLoad={mapLoad} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    name: state.user.name,
    lat: state.user.lat,
    lng: state.user.long
  };
};

export default connect(
  mapStateToProps,
  { getClosestSpellTome, loadTomes, loadTrees , setPlayerCoords, setPlayerLocation }
)(HomePageContainer);