import { MercatorCoordinate } from 'mapbox-gl';
import * as THREE from 'three';

let allLayers = []

export const setPlayerLocation = (map, lat, lng) => async dispatch => {

  // parameters to ensure the model is georeferenced correctly on the map
  const modelOrigin = [lng, lat];
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, - Math.PI / 4 + 0.1, 0];

  const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  );

  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since our 3D model is in real world meters, a scale transform needs to be
    * applied since the CustomLayerInterface expects units in MercatorCoordinates.
    */
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
  };
  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;

  let labelLayerId;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].type === 'custom') {
    labelLayerId = layers[i].id;
    break;
    }
  }

  const customLayer = {
    id: lat.toString() + lng.toString(),
    type: 'custom',
    renderingMode: '3d',
    'fill-extrusion-height': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'height']
    ],
    'fill-extrusion-base': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'min_height']
    ],
    onAdd: function(map, gl) {
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();

    // create two three.js lights to illuminate the model
    const directionalLight = new THREE.DirectionalLight(0xeeeeee);
    directionalLight.position.set(40, -70, 100).normalize();
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xeeeeee);
    directionalLight2.position.set(40, 70, 100).normalize();
    this.scene.add(directionalLight2);

    console.log('HERE');
    // TODO: REPLACE WITH REPTILE
    const ftLength = 50000000  /3.28084;
    const ftWidth = 50000000 / 3.28084;
    const ftHeight = (50000000 / 3.28084) / 100;

    const geometry = new THREE.BoxGeometry( ftWidth, ftHeight, ftLength );
    const material = new THREE.MeshLambertMaterial( {color: 'blue'} );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
    this.map = map;

    // use the Mapbox GL JS map canvas for three.js
    this.renderer = new THREE.WebGLRenderer({
    canvas: map.getCanvas(),
    context: gl,
    antialias: true
    });

    this.renderer.autoClear = false;
    },
    render: function(gl, matrix) {
    const rotationX = new THREE.Matrix4().makeRotationAxis(
    new THREE.Vector3(1, 0, 0),
    modelTransform.rotateX
    );
    const rotationY = new THREE.Matrix4().makeRotationAxis(
    new THREE.Vector3(0, 1, 0),
    modelTransform.rotateY
    );
    const rotationZ = new THREE.Matrix4().makeRotationAxis(
    new THREE.Vector3(0, 0, 1),
    modelTransform.rotateZ
    );

    const m = new THREE.Matrix4().fromArray(matrix);
    const l = new THREE.Matrix4()
    .makeTranslation(
    modelTransform.translateX,
    modelTransform.translateY,
    modelTransform.translateZ
    )
    .scale(
    new THREE.Vector3(
    modelTransform.scale,
    -modelTransform.scale,
    modelTransform.scale
    )
    )
    .multiply(rotationX)
    .multiply(rotationY)
    .multiply(rotationZ);

    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  }
  };

  try {
    clearMap();
    map.addLayer(customLayer, labelLayerId);
    allLayers.push(customLayer.id);
    window.map = map;
  }
  catch (error) {
    console.log('error')
  }
}

export const loadPlayer = (map) => {
  map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 0,
      'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': {
              'type': 'identity',
              'property': 'height'
          },
          'fill-extrusion-base': {
              'type': 'identity',
              'property': 'min_height'
          },
          'fill-extrusion-opacity': .5
      }
  });
}

const clearMap = () => {
  const map = window.map;

  for (let i = 0; i < allLayers.length; i++) {
    map.removeLayer(allLayers[i]);
  }

  allLayers = [];
}
