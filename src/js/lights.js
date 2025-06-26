// new one 

import * as THREE from 'three';

export function setupLights(scene) {
  // Ambient light - slightly warmer tone
  const ambient = new THREE.AmbientLight(0xfff4e6, 0.5);
  scene.add(ambient);
  
  // Main directional light - positioned to simulate gallery lighting
  const directional = new THREE.DirectionalLight(0xfff9f0, 1.0);
  directional.position.set(0, 15, 5);
  directional.castShadow = true;
  
  // Improved shadow quality
  directional.shadow.mapSize.width = 2048;
  directional.shadow.mapSize.height = 2048;
  directional.shadow.camera.near = 1;
  directional.shadow.camera.far = 50;
  directional.shadow.camera.left = -20;
  directional.shadow.camera.right = 20;
  directional.shadow.camera.top = 20;
  directional.shadow.camera.bottom = -20;
  directional.shadow.bias = -0.001;
  scene.add(directional);
  
  // Artwork-focused spotlights with warmer tones
  const spotlight1 = createSpotlight(scene, 0xffeedd, 1.5, [-5, 8, -10]);
  const spotlight2 = createSpotlight(scene, 0xffeedd, 1.5, [5, 8, -10]);
  const spotlight3 = createSpotlight(scene, 0xffeedd, 1.5, [-14, 6, -8]);
  const spotlight4 = createSpotlight(scene, 0xffeedd, 1.5, [14, 6, -8]);
  
  // Additional spotlights for new sculptures
  const spotlight5 = createSpotlight(scene, 0xffeedd, 1.2, [-8, 7, -5]);
  const spotlight6 = createSpotlight(scene, 0xffeedd, 1.2, [8, 7, -5]);
  const spotlight7 = createSpotlight(scene, 0xffeedd, 1.0, [0, 6, -7]);
  const spotlight8 = createSpotlight(scene, 0xffeedd, 1.0, [0, 6, -12]);
  
  scene.add(spotlight1, spotlight2, spotlight3, spotlight4, 
           spotlight5, spotlight6, spotlight7, spotlight8);
  
  // Add subtle fill lights
  const fillLight1 = new THREE.PointLight(0x5566aa, 0.2, 20);
  fillLight1.position.set(-10, 5, 5);
  scene.add(fillLight1);
  
  const fillLight2 = new THREE.PointLight(0xaa5566, 0.2, 20);
  fillLight2.position.set(10, 5, 5);
  scene.add(fillLight2);
  
  return { 
    spotlights: [spotlight1, spotlight2, spotlight3, spotlight4,
                spotlight5, spotlight6, spotlight7, spotlight8],
    directional
  };
}

// [Rest of the file remains the same...]

function createSpotlight(scene, color, intensity, position) {
  const light = new THREE.SpotLight(color, intensity, 30, Math.PI/6, 0.2, 1);
  light.position.set(...position);
  light.castShadow = true;
  
  // Improved shadow settings
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 30;
  
  // Point target toward the center of the gallery
  light.target.position.set(0, 0, -15);
  scene.add(light.target);
  
  return light;
}

export function updateMovingLights(scene, delta) {
  const time = Date.now() * 0.001;
  
  scene.traverse(obj => {
    if (obj.isSpotLight && obj.target) {
      // Gentle movement for dynamic effect
      obj.target.position.x += Math.sin(time * 0.3 + obj.position.x) * 0.1;
      obj.target.position.z += Math.cos(time * 0.2 + obj.position.z) * 0.1;
      obj.target.updateMatrixWorld();
    }
  });
}
















// import * as THREE from 'three';

// export function setupLights(scene) {
//   // Ambient
//   const ambient = new THREE.AmbientLight(0xffffff, 0.4);
//   scene.add(ambient);
  
//   // Directional
//   const directional = new THREE.DirectionalLight(0xffffff, 0.6);
//   directional.position.set(5, 10, 7);
//   directional.castShadow = true;
//   directional.shadow.mapSize.width = 1024;
//   directional.shadow.mapSize.height = 1024;
//   scene.add(directional);
  
//   // Spotlights
//   const spotlight1 = createSpotlight(scene, 0xffaa00, [-8, 8, -12]);
//   const spotlight2 = createSpotlight(scene, 0x00aaff, [8, 8, -12]);
//   scene.add(spotlight1, spotlight2);
  
//   return { spotlights: [spotlight1, spotlight2] };
// }

// function createSpotlight(scene, color, position) {
//   const light = new THREE.SpotLight(color, 2, 20, Math.PI/6, 0.25);
//   light.position.set(...position);
//   light.castShadow = true;
//   light.shadow.mapSize.width = 1024;
//   light.shadow.mapSize.height = 1024;
  
//   // Animation target
//   light.target = new THREE.Object3D();
//   scene.add(light.target);
  
//   return light;
// }

// export function updateMovingLights(scene, delta) {
//   const time = Date.now() * 0.001;
  
//   scene.traverse(obj => {
//     if (obj.isSpotLight && obj.target) {
//       obj.target.position.x = Math.sin(time * 0.5) * 5;
//       obj.target.position.z = Math.cos(time * 0.3) * 5 - 10;
//     }
//   });
// }