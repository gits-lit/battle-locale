import React, { useEffect, useState } from 'react';
import OnboardingPage from '../components/OnboardingPage';
import GamePage from '../components/GamePage';
import AttackPage from '../components/AttackPage';
import NavBar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import Map from '../components/Map';
import { connect } from 'react-redux';
import {pines, daisies, birches} from '../assets/constants.js';

import {
  setPlayerLocation,
  loadTrees,
  loadTomes,
  fireSpell,
} from '../actions/MapActions';
import { getClosestSpellTome, getClosestUser } from '../actions/ClosestActions';
import { setPlayerCoords } from '../actions/UserActions';

let lat1 = '';
let lng1 = '';

const HomePageContainer = (props) => {
  const [flyTo, setFlyTo] = useState(true);
  const [attack, setAttack] = useState(false);
  const [learning, setLearning] = useState(false);

  const enableAttack = () => {
    setAttack(true);
  }

  const disableAttack = () => {
    setAttack(false);
  }

  const enableLearning = () => {
    setLearning(true);
  }

  const disableLearning = () => {
    setLearning(false);
  }

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
    console.log(latitude);
    console.log(longitude);
    lat1 = latitude.toString();
    lng1 = longitude.toString();
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

  const mapClick = (map, event) => {
    const coords = event.lngLat;
    const lng2 = coords.lng;
    const lat2 = coords.lat;
    props.fireSpell(map, lat1, lng1, lat2.toString(), lng2.toString());
  }

  let hud = <GamePage enableAttack={enableAttack} enableLearning={enableLearning}/>
  if (attack) {
    hud = <AttackPage disableAttack={disableAttack} />;
  } else if (learning) {
    hud = <ProgressBar disableLearning={disableLearning}/>;
  } else {
    hud = <GamePage enableAttack={enableAttack} enableLearning={enableLearning}/>
  }

  return (
    <>
      <OnboardingPage startLocation={startLocation}/>
      <NavBar />
      {hud}
      <Map mapClick={mapClick} mapLoad={mapLoad} />
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
  { fireSpell, getClosestSpellTome, loadTomes, loadTrees , setPlayerCoords, setPlayerLocation }
)(HomePageContainer);