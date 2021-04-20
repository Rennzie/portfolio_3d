import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas: HTMLCanvasElement | null = document.querySelector('canvas.webgl');
if (!canvas)
  throw Error(
    'Could not find selected canvas in the document. Did you use the correct selector?',
  );

// Textures
const textureLoader = new THREE.TextureLoader();

// door
const doorAlpha = textureLoader.load('textures/door/alpha.jpg');
const doorAmbientOcclusion = textureLoader.load(
  'textures/door/ambientOcclusion.jpg',
);
const doorColor = textureLoader.load('textures/door/color.jpg');
const doorHeight = textureLoader.load('textures/door/height.jpg');
const doorMetalness = textureLoader.load('textures/door/metalness.jpg');
const doorNormal = textureLoader.load('textures/door/normal.jpg');
const doorRoughness = textureLoader.load('textures/door/roughness.jpg');

// thatch
const thatchAmbientOcclusion = textureLoader.load(
  'textures/thatch/ambientOcclusion.jpg',
);
thatchAmbientOcclusion.repeat.set(5, 1);
thatchAmbientOcclusion.wrapS = THREE.RepeatWrapping;
thatchAmbientOcclusion.wrapT = THREE.RepeatWrapping;
const thatchColor = textureLoader.load('textures/thatch/colorDark.jpg');
thatchColor.repeat.set(5, 1);
thatchColor.wrapS = THREE.RepeatWrapping;
thatchColor.wrapT = THREE.RepeatWrapping;
const thatchHeight = textureLoader.load('textures/thatch/displacement.jpg');
thatchHeight.repeat.set(5, 1);
thatchHeight.wrapS = THREE.RepeatWrapping;
thatchHeight.wrapT = THREE.RepeatWrapping;
const thatchMetalness = textureLoader.load('textures/thatch/metalness.jpg');
thatchMetalness.repeat.set(5, 1);
thatchMetalness.wrapS = THREE.RepeatWrapping;
thatchMetalness.wrapT = THREE.RepeatWrapping;
const thatchNormal = textureLoader.load('textures/thatch/normal.jpg');
thatchNormal.repeat.set(5, 1);
thatchNormal.wrapS = THREE.RepeatWrapping;
thatchNormal.wrapT = THREE.RepeatWrapping;
const thatchRoughness = textureLoader.load('textures/thatch/roughness.jpg');
thatchRoughness.repeat.set(5, 1);
thatchRoughness.wrapS = THREE.RepeatWrapping;
thatchRoughness.wrapT = THREE.RepeatWrapping;

// mud
const mudAmbientOcclusion = textureLoader.load(
  'textures/mud/ambientOcclusion.jpg',
);
mudAmbientOcclusion.repeat.set(5, 1);
mudAmbientOcclusion.wrapS = THREE.RepeatWrapping;
mudAmbientOcclusion.wrapT = THREE.RepeatWrapping;
const mudColor = textureLoader.load('textures/mud/color.jpg');
mudColor.repeat.set(5, 1);
gui.add(mudColor.repeat, 'x').min(0).max(10).step(1);
gui.add(mudColor.repeat, 'y').min(0).max(10).step(1);
mudColor.wrapS = THREE.RepeatWrapping;
mudColor.wrapT = THREE.RepeatWrapping;
const mudHeight = textureLoader.load('textures/mud/displacement.jpg');
mudHeight.repeat.set(5, 1);
mudHeight.wrapS = THREE.RepeatWrapping;
mudHeight.wrapT = THREE.RepeatWrapping;
const mudMetalness = textureLoader.load('textures/mud/metalness.jpg');
mudMetalness.repeat.set(5, 1);
mudMetalness.wrapS = THREE.RepeatWrapping;
mudMetalness.wrapT = THREE.RepeatWrapping;
const mudNormal = textureLoader.load('textures/mud/normal.jpg');
mudNormal.repeat.set(5, 1);
mudNormal.wrapS = THREE.RepeatWrapping;
mudNormal.wrapT = THREE.RepeatWrapping;
const mudRoughness = textureLoader.load('textures/mud/roughness.jpg');
mudRoughness.repeat.set(5, 1);
mudRoughness.wrapS = THREE.RepeatWrapping;
mudRoughness.wrapT = THREE.RepeatWrapping;
const mudBump = textureLoader.load('textures/mud/bump.jpg');
mudBump.repeat.set(5, 1);
mudBump.wrapS = THREE.RepeatWrapping;
mudBump.wrapT = THREE.RepeatWrapping;

// Scene
const scene = new THREE.Scene();

/**
 * OBJECTS
 */

// RONDAVEL
const rondavelSizes = {
  height: 2.2,
  radius: 2.5,
  doorHeight: 2,
  windowHeight: 1,
  windowWidth: 2,
  roofHeight: 2,
  roofRadius: 2.75,
  roofBasePosition: 3.1,
  doorTheta: 0.8,
};

const rondavel = new THREE.Group();
scene.add(rondavel);

// Walls/body
const wallMaterial = new THREE.MeshStandardMaterial({
  color: 0xd3d3d3,
  map: mudColor,
  aoMap: mudAmbientOcclusion,
  normalMap: mudNormal,
  displacementMap: mudHeight,
  displacementScale: 0.01,
  roughnessMap: mudRoughness,
  metalnessMap: mudMetalness,
  bumpMap: mudBump,
  // wireframe: true,
});
const wallGeometry = new THREE.CylinderGeometry(
  rondavelSizes.radius,
  rondavelSizes.radius,
  rondavelSizes.height,
  100,
  100,
  true,
);
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(0, rondavelSizes.height / 2, 0);

// Roof
const roofMaterial = new THREE.MeshStandardMaterial({
  map: thatchColor,
  aoMap: thatchAmbientOcclusion,
  normalMap: thatchNormal,
  displacementMap: thatchHeight,
  displacementScale: 0.01,
  roughnessMap: thatchRoughness,
  metalnessMap: thatchMetalness,
  // wireframe: true,
});
const roofGeometry = new THREE.CylinderGeometry(
  0,
  rondavelSizes.roofRadius,
  rondavelSizes.roofHeight,
  250,
  250,
);

const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.set(0, rondavelSizes.roofBasePosition, 0);
// roof.geometry.parameters.openEnded = true;

// Door
const doorMaterial = new THREE.MeshStandardMaterial({
  map: doorColor,
  transparent: true,
  alphaMap: doorAlpha,
  aoMap: doorAmbientOcclusion,
  roughnessMap: doorRoughness,
  normalMap: doorNormal,
  metalnessMap: doorMetalness,
  displacementMap: doorHeight,
  displacementScale: 0.05,
});

const doorGeometry = new THREE.CylinderGeometry(
  rondavelSizes.radius + 0.001,
  rondavelSizes.radius,
  rondavelSizes.doorHeight,
  100,
  100,
  true,
  0,
  rondavelSizes.doorTheta,
);

const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, rondavelSizes.doorHeight / 2, 0);

rondavel.add(wall, roof, door);

// FLOOR
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    color: 'green',
    // map: grassColorTexture,
    // aoMap: grassAmbientOcclusionTexture,
    // normalMap: grassNormalTexture,
    // roughnessMap: grassRoughnessTexture,
  }),
);
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2),
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.65);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 0.75);
directionalLight.position.set(4, 3, 5);
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001);
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 10;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x87cfff);

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
rondavel.castShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
