// USING MAPBOX TEMPORARILY, AIMING TO SWITCH TO GOOGLE MAPS

import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw'
});

const MapComponent = (props) => {
  return (
    <div className="map">
      <Map
        antialias={true}
        containerStyle={{
          height: '100vh',
          width: '100vw',
          position: 'absolute',
          right: '0'
        }}
        center={[-117.2201226, 32.860568]}
        flyToOptions={{
          speed: 5
        }}
        onClick={props.mapClick}
        onStyleLoad={props.mapLoad}
        pitch={[60]}
        style="mapbox://styles/mapbox/streets-v11"
        zoom={[15]}
      >
      </Map>
    </div>
  );
}

export default MapComponent;