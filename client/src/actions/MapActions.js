import { MercatorCoordinate } from 'mapbox-gl';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

let playerLayers = [];
let treeLayers = [];
let spellLayer = [];

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

  // configuration of the custom layer for a 3D model per the CustomLayerInterface
const customLayer = {
  id: '3d-model',
  type: 'custom',
  renderingMode: '3d',
  onAdd: function (map, gl) {
  this.camera = new THREE.Camera();
  this.scene = new THREE.Scene();

  var light = new THREE.AmbientLight(0x404040);
  this.scene.add(light);
   
  // use the three.js GLTF loader to add the player model to the three.js scene
  var loader = new GLTFLoader();
  loader.load(
  './player/scene.gltf',
  function (gltf) {
  this.scene.add(gltf.scene);
  }.bind(this)
  ); 
  this.map = map;
   
  // use the Mapbox GL JS map canvas for three.js
  this.renderer = new THREE.WebGLRenderer({
  canvas: map.getCanvas(),
  context: gl,
  antialias: true
  });
   
  this.renderer.autoClear = false;
  this.renderer.gammaOutput = true;
  this.renderer.gammaFactor = 2.2;
  },
  render: function (gl, matrix) {
  var rotationX = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(1, 0, 0),
  modelTransform.rotateX
  );
  var rotationY = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 1, 0),
  modelTransform.rotateY
  );
  var rotationZ = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 0, 1),
  modelTransform.rotateZ
  );
   
  var m = new THREE.Matrix4().fromArray(matrix);
  var l = new THREE.Matrix4()
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

    console.log('HERE');

  try {
    clearMap();
    map.addLayer(customLayer, labelLayerId);
    playerLayers.push(customLayer.id);
    window.map = map;
  }
  catch (error) {
    console.log('error')
  }
}

export const loadTomes = (map) => async dispatch => {
  console.log('loadTomes')
  const response = await fetch('https://battle-locale.herokuapp.com/api/game/getAllSpellTomes', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });

    const data = await response.json();
    console.log(data);
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    for (let i = 0; i < data.spellTomes.length; i++) {
      const tome = data.spellTomes[i];
      addTome(map, tome.lat, tome.long);
    }

}

export const loadTrees = (map, pines, birches, daisies) => {
  console.log('load');
  for (let i = 0; i < pines.length; i++) {
    const tree = pines[i];
    addPine(map, tree[0], tree[1]);
  }
  for (let i = 0; i < birches.length; i++) {
    const tree = birches[i];
    addBirch(map, tree[0], tree[1]);
  }
  for (let i = 0; i < daisies.length; i++) {
    const tree = daisies[i];
    addDaisy(map, tree[0], tree[1]);
  }
}

const addPine = (map, lat, lng) => {
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
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 30
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

  // configuration of the custom layer for a 3D model per the CustomLayerInterface
  const customLayer = {
  id: 'tree' + lng.toString() + lat.toString(),
  type: 'custom',
  renderingMode: '3d',
  onAdd: function (map, gl) {
  this.camera = new THREE.Camera();
  this.scene = new THREE.Scene();

  // create two three.js lights to illuminate the model
var directionalLight = new THREE.DirectionalLight(0xc0c0c0);
directionalLight.position.set(0, -70, 100).normalize();
this.scene.add(directionalLight);
 
var directionalLight2 = new THREE.DirectionalLight(0xc0c0c0);
directionalLight2.position.set(0, 70, 100).normalize();
this.scene.add(directionalLight2);
  
  // use the three.js GLTF loader to add the player model to the three.js scene
  var loader = new GLTFLoader();
  loader.load(
  './pine_tree/scene.gltf',
  function (gltf) {
  gltf.scene.rotation.y = Math.random() * 2 * Math.PI;
  this.scene.add(gltf.scene);
  }.bind(this)
  );
  this.map = map;
  
  // use the Mapbox GL JS map canvas for three.js
  this.renderer = new THREE.WebGLRenderer({
  canvas: map.getCanvas(),
  context: gl,
  antialias: true
  });
  
  this.renderer.autoClear = false;
  this.renderer.gammaOutput = true;
  this.renderer.gammaFactor = 22;
  },
  render: function (gl, matrix) {
  var rotationX = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(1, 0, 0),
  modelTransform.rotateX
  );
  var rotationY = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 1, 0),
  modelTransform.rotateY
  );
  var rotationZ = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 0, 1),
  modelTransform.rotateZ
  );
  
  var m = new THREE.Matrix4().fromArray(matrix);
  var l = new THREE.Matrix4()
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
    map.addLayer(customLayer, labelLayerId);
    treeLayers.push(customLayer.id);
    window.map = map;
  }
  catch (error) {
    console.log('error')
  }
}

const addBirch = (map, lat, lng) => {
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
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 30
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

  // configuration of the custom layer for a 3D model per the CustomLayerInterface
  const customLayer = {
  id: 'birch' + lng.toString() + lat.toString(),
  type: 'custom',
  renderingMode: '3d',
  onAdd: function (map, gl) {
  this.camera = new THREE.Camera();
  this.scene = new THREE.Scene();

  // create two three.js lights to illuminate the model
var directionalLight = new THREE.DirectionalLight(0xc0c0c0);
directionalLight.position.set(0, -70, 100).normalize();
this.scene.add(directionalLight);
 
var directionalLight2 = new THREE.DirectionalLight(0xc0c0c0);
directionalLight2.position.set(0, 70, 100).normalize();
this.scene.add(directionalLight2);
  
  // use the three.js GLTF loader to add the player model to the three.js scene
  var loader = new GLTFLoader();
  loader.load(
  './birch_tree/scene.gltf',
  function (gltf) {
  gltf.scene.rotation.y = Math.random() * 2 * Math.PI;
  gltf.scene.position.x -= 20;
  this.scene.add(gltf.scene);
  }.bind(this)
  );
  this.map = map;
  
  // use the Mapbox GL JS map canvas for three.js
  this.renderer = new THREE.WebGLRenderer({
  canvas: map.getCanvas(),
  context: gl,
  antialias: true
  });
  
  this.renderer.autoClear = false;
  this.renderer.gammaOutput = true;
  this.renderer.gammaFactor = 22;
  },
  render: function (gl, matrix) {
  var rotationX = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(1, 0, 0),
  modelTransform.rotateX
  );
  var rotationY = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 1, 0),
  modelTransform.rotateY
  );
  var rotationZ = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 0, 1),
  modelTransform.rotateZ
  );
  
  var m = new THREE.Matrix4().fromArray(matrix);
  var l = new THREE.Matrix4()
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
    map.addLayer(customLayer, labelLayerId);
    treeLayers.push(customLayer.id);
    window.map = map;
  }
  catch (error) {
    console.log('error')
  }
}


const addDaisy = (map, lat, lng) => {
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
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 30
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

  // configuration of the custom layer for a 3D model per the CustomLayerInterface
  const customLayer = {
  id: 'tree' + lng.toString() + lat.toString(),
  type: 'custom',
  renderingMode: '3d',
  onAdd: function (map, gl) {
  this.camera = new THREE.Camera();
  this.scene = new THREE.Scene();

  // create two three.js lights to illuminate the model
var directionalLight = new THREE.DirectionalLight(0xc0c0c0);
directionalLight.position.set(0, -70, 100).normalize();
this.scene.add(directionalLight);
 
var directionalLight2 = new THREE.DirectionalLight(0xc0c0c0);
directionalLight2.position.set(0, 70, 100).normalize();
this.scene.add(directionalLight2);
  
  // use the three.js GLTF loader to add the player model to the three.js scene
  var loader = new GLTFLoader();
  loader.load(
  './daisy_tree/scene.gltf',
  function (gltf) {
  gltf.scene.rotation.y = Math.random() * 2 * Math.PI;
  this.scene.add(gltf.scene);
  }.bind(this)
  );
  this.map = map;
  
  // use the Mapbox GL JS map canvas for three.js
  this.renderer = new THREE.WebGLRenderer({
  canvas: map.getCanvas(),
  context: gl,
  antialias: true
  });
  
  this.renderer.autoClear = false;
  this.renderer.gammaOutput = true;
  this.renderer.gammaFactor = 22;
  },
  render: function (gl, matrix) {
  var rotationX = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(1, 0, 0),
  modelTransform.rotateX
  );
  var rotationY = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 1, 0),
  modelTransform.rotateY
  );
  var rotationZ = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 0, 1),
  modelTransform.rotateZ
  );
  
  var m = new THREE.Matrix4().fromArray(matrix);
  var l = new THREE.Matrix4()
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
    map.addLayer(customLayer, labelLayerId);
    treeLayers.push(customLayer.id);
    window.map = map;
  }
  catch (error) {
    console.log('error')
  }
}

const addTome = (map, lat, lng) => {
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
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 15
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

  // configuration of the custom layer for a 3D model per the CustomLayerInterface
  const customLayer = {
  id: 'tree' + lng.toString() + lat.toString(),
  type: 'custom',
  renderingMode: '3d',
  onAdd: function (map, gl) {
  this.camera = new THREE.Camera();
  this.scene = new THREE.Scene();

  // create two three.js lights to illuminate the model
var directionalLight = new THREE.DirectionalLight(0xc0c0c0);
directionalLight.position.set(0, -70, 100).normalize();
this.scene.add(directionalLight);
 
var directionalLight2 = new THREE.DirectionalLight(0xc0c0c0);
directionalLight2.position.set(0, 70, 100).normalize();
this.scene.add(directionalLight2);
  // use the three.js GLTF loader to add the player model to the three.js scene
  var loader = new GLTFLoader();
  loader.load(
  './crystal_staff/scene.gltf',
  function (gltf) {
  gltf.scene.rotation.y = Math.random() * 2 * Math.PI;
  this.scene.add(gltf.scene);
  this.obj = gltf.scene;
  }.bind(this)
  );
  this.map = map;
  
  // use the Mapbox GL JS map canvas for three.js
  this.renderer = new THREE.WebGLRenderer({
  canvas: map.getCanvas(),
  context: gl,
  antialias: true
  });
  
  this.renderer.autoClear = false;
  this.renderer.gammaOutput = true;
  this.renderer.gammaFactor = 22;
  },
  render: function (gl, matrix) {
  var rotationX = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(1, 0, 0),
  modelTransform.rotateX
  );
  var rotationY = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 1, 0),
  modelTransform.rotateY
  );
  var rotationZ = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 0, 1),
  modelTransform.rotateZ
  );
  
  var m = new THREE.Matrix4().fromArray(matrix);
  var l = new THREE.Matrix4()
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
  const animate = () => {
      requestAnimationFrame(animate);
      if(this.obj && this.obj.rotation && this.obj.rotation.y) {
        this.obj.rotation.y += 0.001;
      }

      this.renderer.render(this.scene, this.camera);
  }
  animate();

  }
  };
  
  try {
    map.addLayer(customLayer, labelLayerId);
    treeLayers.push(customLayer.id);
    window.map = map;
  }
  catch (error) {
    console.log('error')
  }
}

export const fireSpell = (map, lat, lng, targetLat, targetLng, color) => async dispatch => {
  let variable = 0;

  // parameters to ensure the model is georeferenced correctly on the map
  const modelOrigin = [lng, lat];
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, - Math.PI / 4 + 0.1, 0];

  const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  );

  const modelOrigin2 = [targetLng, targetLat];

  const modelAsMercatorCoordinate2 = MercatorCoordinate.fromLngLat(
    modelOrigin2,
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
    }
  }

  const customLayer = {
    id: 'spells' + lng.toString() + lat.toString(),
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();

    // create two three.js lights to illuminate the model
    const directionalLight = new THREE.DirectionalLight(0xeeeeee);
    directionalLight.position.set(40, -70, 100).normalize();
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xeeeeee);
    directionalLight2.position.set(40, 70, 100).normalize();
    this.scene.add(directionalLight2);

    const geometry = new THREE.SphereGeometry( 30, 30, 30 );
    const material = new THREE.MeshBasicMaterial( {color: color} );
    const cube = new THREE.Mesh( geometry, material );
    this.obj = cube;
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
    const initialPositionX = modelAsMercatorCoordinate.x / modelAsMercatorCoordinate.meterInMercatorCoordinateUnits();
    const targetPositionX = modelAsMercatorCoordinate2.x / modelAsMercatorCoordinate.meterInMercatorCoordinateUnits();
    const initialPositionY = modelAsMercatorCoordinate.y / modelAsMercatorCoordinate.meterInMercatorCoordinateUnits();
    const targetPositionY = modelAsMercatorCoordinate2.y / modelAsMercatorCoordinate.meterInMercatorCoordinateUnits();
    const animate = () => {
      if(this.obj) {
        if (variable != 100) {
          requestAnimationFrame(animate);
          this.obj.position.x += ((targetPositionX - initialPositionX) * .01 ); // You decide on the increment, higher value will mean the objects moves faster
          this.obj.position.y -= ((targetPositionY - initialPositionY) * .01 ); // You decide on the increment, higher value will mean the objects moves faster
          variable += 1
        }
        else {
          clearSpell();
        }
      }
    }
    animate();
    }
  };
  
  try {
    map.addLayer(customLayer, labelLayerId);
    spellLayer.push(customLayer.id);
    window.map = map;
  }
  catch (error) {
    console.log('error')
  }
}

const clearSpell = () => {
  const map = window.map;
  for (let i = 0; i < spellLayer.length; i++) {
    map.removeLayer(spellLayer[i]);
  }
  spellLayer = [];

}

const clearMap = () => {
  const map = window.map;
  console.log('clear')

  for (let i = 0; i < playerLayers.length; i++) {
    map.removeLayer(playerLayers[i]);
  }

/*
  for (let i = 0; i < treeLayers.length; i++) {
    map.removeLayer(treeLayers[i]);
  }
*/



  playerLayers = [];
}
