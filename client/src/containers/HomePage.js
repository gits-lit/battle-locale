import React, { useEffect, useState } from 'react';
import OnboardingPage from '../components/OnboardingPage';
import GamePage from '../components/GamePage';
import AttackPage from '../components/AttackPage';
import NavBar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import Map from '../components/Map';
import { connect } from 'react-redux';
import {pines, daisies, birches} from '../assets/constants.js';
import fireball from '../assets/fireball.png';

import {
  setPlayerLocation,
  loadTrees,
  loadTomes,
  fireSpell,
} from '../actions/MapActions';
import { getClosestSpellTome, getClosestUser, learnSpell } from '../actions/ClosestActions';
import { setPlayerCoords, getAllUsers, getPlayerHealth } from '../actions/UserActions';

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
    console.log('useEffect');
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
    lat1 = latitude.toString();
    lng1 = longitude.toString();
    setPlayerLocation(window.map, latitude, longitude);
    props.getAllUsers();
    props.getPlayerHealth(props.name);
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
    props.fireSpell(map, lat1, lng1, lat2.toString(), lng2.toString(), '#dd5511');
  }

  let hud = <GamePage enableAttack={enableAttack} enableLearning={enableLearning} arcane={props.arcane} heal={props.heal} fireball={props.fireball} icebolt={props.icebolt}/>
  if (attack) {
    hud = <AttackPage disableAttack={disableAttack} arcane={props.arcane} heal={props.heal} fireball={props.fireball} icebolt={props.icebolt}/>;
  } else if (learning) {
    hud = <ProgressBar disableLearning={disableLearning} name="Fireball" stats="10att 20sec cooldown" img={fireball} learnSpell={props.learnSpell}/>;
  } else {
    hud = <GamePage enableAttack={enableAttack} enableLearning={enableLearning} arcane={props.arcane} heal={props.heal} fireball={props.fireball} icebolt={props.icebolt}/>
  }

  return (
    <>
      <OnboardingPage startLocation={startLocation}/>
      <NavBar alive={props.count} health={props.health}/>
      {hud}
      <Map mapClick={mapClick} mapLoad={mapLoad} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    name: state.user.name,
    lat: state.user.lat,
    lng: state.user.long,
    count: state.alluser.count,
    health: state.user.health,
    arcane: state.user.arcane,
    fireball: state.user.fireball,
    icebolt: state.user.icebolt,
    heal: state.user.heal
  };
};

export default connect(
  mapStateToProps,
  { learnSpell, getAllUsers, fireSpell, getClosestSpellTome, loadTomes, loadTrees , setPlayerCoords, setPlayerLocation, getPlayerHealth }
)(HomePageContainer);