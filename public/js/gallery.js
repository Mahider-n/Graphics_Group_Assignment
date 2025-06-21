import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export async function initGallery(scene, world) {
  // Create floor
  const floorGeo = new THREE.PlaneGeometry(20, 20);
  const floorMat = new THREE.MeshStandardMaterial({ 
    color: 0x888888,
    roughness: 0.8
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Physics body for floor
  const floorBody = new CANNON.Body({ mass: 0 });
  floorBody.addShape(new CANNON.Plane());
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2);
  world.addBody(floorBody);

  // Create walls
  const wallHeight = 4;
  const wallThickness = 0.2;
  
  const walls = [
    { position: [0, wallHeight/2, -10], size: [20, wallHeight, wallThickness] },
    { position: [0, wallHeight/2, 10], size: [20, wallHeight, wallThickness] },
    { position: [-10, wallHeight/2, 0], size: [wallThickness, wallHeight, 20] },
    { position: [10, wallHeight/2, 0], size: [wallThickness, wallHeight, 20] }
  ];

  walls.forEach(wallConfig => {
    const wallGeo = new THREE.BoxGeometry(...wallConfig.size);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xdddddd });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(...wallConfig.position);
    wall.castShadow = true;
    wall.receiveShadow = true;
    scene.add(wall);
  });

  // Load 3D models (example)
  const loader = new THREE.GLTFLoader();
  const models = await Promise.all([
    loader.loadAsync('/assets/models/s1.jpg'),
    loader.loadAsync('/assets/models/s2.glb'),
    // Add more models
  ]);

  models.forEach((gltf, i) => {
    const model = gltf.scene;
    model.position.set(i*2 - 3, 0, -5);
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);
    
    // Add physics body
    const body = new CANNON.Body({ mass: 1 });
    body.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 1, 0.5)));
    body.position.copy(model.position);
    world.addBody(body);
  });

  // Create 2D artworks
  const paintings = [
    { position: [0, 2, -9.9], rotation: [0, 0, 0], size: [3, 2], texture: '/assets/artworks/a1.jpg' },
    // Add more paintings
  ];

  paintings.forEach(config => {
    const texture = new THREE.TextureLoader().load(config.texture);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(...config.size);
    const painting = new THREE.Mesh(geometry, material);
    painting.position.set(...config.position);
    painting.rotation.set(...config.rotation);
    scene.add(painting);
  });
}
// Create interactive pedestal
function createPedestal(position, artObject) {
  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const pedestal = new THREE.Mesh(geometry, material);
  pedestal.position.set(...position);
  
  // Physics body
  const body = new CANNON.Body({ mass: 5 });
  body.addShape(new CANNON.Cylinder(0.5, 0.5, 1, 16));
  body.position.copy(pedestal.position);
  
  // Add artwork on top
  artObject.position.y = 1;
  pedestal.add(artObject);
  
  scene.add(pedestal);
  world.addBody(body);
  
  // Link Three.js and Cannon.js objects
  pedestal.userData.physicsBody = body;
}
