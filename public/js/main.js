import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';
import { GUI } from 'dat.gui';

import { initGallery } from './gallery.js';
import { setupLights } from './lights.js';
import { setupControls } from './controls.js';
import { setupInteractions } from './interactions.js';
import { setupPostProcessing } from './postprocessing.js';

let scene, camera, renderer, world;
let orbitControls, pointerControls;
let activeControls;
let raycaster, interactiveObjects = [];
let infoPanel, artTitle, artDescription;

init();

async function init() {
  // Basic setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x333333);
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 5);
  
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  
  // Physics world
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);
  
  // Initialize modules
  await initGallery(scene, world);
  setupLights(scene);
  const controls = setupControls(camera, renderer);
  orbitControls = controls.orbit;
  pointerControls = controls.pointer;
  activeControls = orbitControls;
  
  setupInteractions(camera, scene, renderer);
  setupPostProcessing(renderer, scene, camera);
  
  // UI elements
  infoPanel = document.getElementById('info-panel');
  artTitle = document.getElementById('art-title');
  artDescription = document.getElementById('art-description');
  
  // Hide loading screen
  document.getElementById('loading-screen').classList.add('hidden');
  
  // Start animation loop
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  world.step(1/60);
  activeControls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});