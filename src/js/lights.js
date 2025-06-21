import * as THREE from 'three';

export function setupLights(scene) {
  // Ambient
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  
  // Directional
  const directional = new THREE.DirectionalLight(0xffffff, 0.6);
  directional.position.set(5, 10, 7);
  directional.castShadow = true;
  directional.shadow.mapSize.width = 1024;
  directional.shadow.mapSize.height = 1024;
  scene.add(directional);
  
  // Spotlights
  const spotlight1 = createSpotlight(scene, 0xffaa00, [-8, 8, -12]);
  const spotlight2 = createSpotlight(scene, 0x00aaff, [8, 8, -12]);
  scene.add(spotlight1, spotlight2);
  
  return { spotlights: [spotlight1, spotlight2] };
}

function createSpotlight(scene, color, position) {
  const light = new THREE.SpotLight(color, 2, 20, Math.PI/6, 0.25);
  light.position.set(...position);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  
  // Animation target
  light.target = new THREE.Object3D();
  scene.add(light.target);
  
  return light;
}

export function updateMovingLights(scene, delta) {
  const time = Date.now() * 0.001;
  
  scene.traverse(obj => {
    if (obj.isSpotLight && obj.target) {
      obj.target.position.x = Math.sin(time * 0.5) * 5;
      obj.target.position.z = Math.cos(time * 0.3) * 5 - 10;
    }
  });
}