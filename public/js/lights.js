export function setupLights(scene) {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Directional light
  const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
  sunLight.position.set(5, 10, 7);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  scene.add(sunLight);
  
  // Spotlights for artworks
  const spotLight1 = new THREE.SpotLight(0xffaa33, 2);
  spotLight1.position.set(-3, 5, -5);
  spotLight1.target.position.set(-3, 0, -5);
  spotLight1.angle = Math.PI/6;
  spotLight1.penumbra = 0.2;
  spotLight1.castShadow = true;
  scene.add(spotLight1);
  scene.add(spotLight1.target);
  
  // Add more spotlights as needed
}