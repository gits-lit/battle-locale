import React, { useEffect, useState } from 'react';
import Map from '../components/Map';

const GameMap = props => {

  useEffect(() => {
    const gameLoop = () => {
      console.log('Updating');
    }

    console.log('useEffect');
    setInterval(gameLoop, 30000);
  }, []);

  const mapLoad = map => {
    window.map = map;
  };

  return (
    <div>
      <Map mapLoad={mapLoad} />
    </div>
  );
};

export default GameMap;