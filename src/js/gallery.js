// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { setupLights, updateMovingLights } from './lights.js';
// import {
//   setupOrbitControls,
//   setupPointerLockControls,
//   toggleControls,
//   activeControl,
//   orbitControls,
//   pointerControls
// } from './controls.js';
// import { initPostProcessing } from './postprocessing.js';
// import { setupRaycaster } from './interactions.js';
// import { Artwork } from './classes/Artwork.js';
// import { Pedestal } from './classes/Pedestal.js';
// import { loadModel, textureLoader, gltfLoader } from './utils/loaders.js';

// // Global variables
// let scene, camera, renderer, composer;
// let artworks = [];
// let clock = new THREE.Clock();
// let loadingManager;

// export function initGallery() {
//   try {
//     setupLoadingManager();

//     // Scene setup
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xeeeeee);
//     scene.fog = new THREE.Fog(0xcccccc, 15, 30);

//     // Enhanced camera settings
//     camera = new THREE.PerspectiveCamera(
//       50, // Reduced FOV for less distortion
//       window.innerWidth / window.innerHeight,
//       0.05, // Increased near plane
//       100 // Reduced far plane
//     );
//     camera.position.set(0, 1.6, 5);
//     camera.lookAt(0, 1.6, -10);

//     // Enhanced renderer settings
//     renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//       powerPreference: "high-performance",
//       logarithmicDepthBuffer: true
//     });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     renderer.outputEncoding = THREE.sRGBEncoding;
//     renderer.physicallyCorrectLights = true;
//     renderer.toneMapping = THREE.NoToneMapping;
//     document.getElementById('app').appendChild(renderer.domElement);

//     // Lighting
//     setupLights(scene);

//     // Controls
//     setupOrbitControls(camera, renderer.domElement);
//     setupPointerLockControls(camera, renderer.domElement);

//     orbitControls.target.set(0, 1.6, -10);
//     orbitControls.update();

//     // Gallery structure
//     createGalleryStructure();

//     // Load artworks
//     loadArtworks();

//     // Post-processing
//     composer = initPostProcessing(renderer, scene, camera);

//     // Event listeners
//     setupEventListeners();

//     // Animation loop
//     animate();
//   } catch (error) {
//     console.error('Gallery initialization failed:', error);
//     document.getElementById('loading-screen').innerHTML = `
//       <h1>Error Loading Gallery</h1>
//       <p>${error.message}</p>
//       <p>Check console for details</p>
//     `;
//   }
// }

// function setupLoadingManager() {
//   loadingManager = new THREE.LoadingManager();

//   loadingManager.onStart = () => {
//     document.getElementById('loading-screen').style.display = 'flex';
//   };

//   loadingManager.onProgress = (url, loaded, total) => {
//     const progress = (loaded / total) * 100;
//     document.querySelector('.progress-bar').style.width = `${progress}%`;
//   };

//   loadingManager.onLoad = () => {
//     setTimeout(() => {
//       document.getElementById('loading-screen').style.display = 'none';
//     }, 500);
//   };

//   loadingManager.onError = (url) => {
//     console.error(`Error loading: ${url}`);
//     document.querySelector('.progress-bar').style.background = '#ff0000';
//   };

//   textureLoader.manager = loadingManager;
//   gltfLoader.manager = loadingManager;
// }

// function createGalleryStructure() {
//   // Floor
//   const floorGeometry = new THREE.PlaneGeometry(30, 30);
//   const floorMaterial = new THREE.MeshStandardMaterial({
//     color: 0x888888,
//     roughness: 0.8,
//     metalness: 0.2
//   });
//   const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//   floor.rotation.x = -Math.PI / 2;
//   floor.receiveShadow = true;
//   scene.add(floor);

//   // Walls
//   const wallMaterial = new THREE.MeshStandardMaterial({
//     color: 0xf0f0f0,
//     roughness: 0.7,
//     metalness: 0.1
//   });

//   const wallPositions = [
//     [0, 5, -15, 0],         // Back wall
//     [-15, 5, 0, Math.PI/2], // Left wall
//     [15, 5, 0, Math.PI/2],  // Right wall
//   ];

//   wallPositions.forEach(pos => {
//     const wall = new THREE.Mesh(
//       new THREE.BoxGeometry(30, 10, 0.2),
//       wallMaterial
//     );
//     wall.position.set(pos[0], pos[1], pos[2]);
//     wall.rotation.y = pos[3];
//     wall.castShadow = true;
//     wall.receiveShadow = true;
//     scene.add(wall);
//   });

//   // Ceiling
//   const ceiling = new THREE.Mesh(
//     new THREE.PlaneGeometry(30, 30),
//     new THREE.MeshStandardMaterial({ color: 0xdddddd })
//   );
//   ceiling.rotation.x = Math.PI / 2;
//   ceiling.position.y = 10;
//   ceiling.receiveShadow = true;
//   scene.add(ceiling);
// }

// async function loadArtworks() {
//   try {
//     // 2D Artworks
//     const paintings = [
//       {
//         position: new THREE.Vector3(-14, 3, -8),
//         rotation: new THREE.Euler(0, Math.PI/2, 0),
//         config: {
//           texturePath: '/assets/artworks/a1.jpg',
//           size: { width: 4, height: 3 },
//           frame: { thickness: 0.2, depth: 0.1, color: 0x8b4513 }
//         },
//         info: {
//           title: "Starry Night",
//           description: "Modern interpretation of classic landscape"
//         }
//       },
//       {
//         position: new THREE.Vector3(14, 3, -8),
//         rotation: new THREE.Euler(0, -Math.PI/2, 0),
//         config: {
//           texturePath: '/assets/artworks/a1.jpg',
//           size: { width: 3, height: 4 },
//           frame: { thickness: 0.2, depth: 0.1, color: 0x8b4513 }
//         },
//         info: {
//           title: "Abstract Thoughts",
//           description: "Expressionist oil painting from 2023"
//         }
//       },
//        {
//     position: new THREE.Vector3(-7, 3, -14),
//     rotation: new THREE.Euler(0, 0, 0),
//     config: {
//       texturePath: '/assets/artworks/a2.jpg',
//       size: { width: 5, height: 3 },
//       frame: { thickness: 0.2, depth: 0.1, color: 0x8b4513 }
//     },
//     info: {
//       title: "The Maskal Flower",
//       description: "The Maskal Flower, 1959 - Afewerk Tekle in Expressionism style."
//     }
//   }
//     ];

//     for (const painting of paintings) {
//       const artwork = new Artwork('2d', painting.config, renderer); // Pass renderer here
//       artwork.mesh.position.copy(painting.position);
//       artwork.mesh.rotation.copy(painting.rotation);
//       artwork.mesh.userData = painting.info;
//       scene.add(artwork.mesh);
//       artworks.push(artwork.mesh);
//     }

//     // 3D Artworks
//     const sculptures = [
//       {
//         position: new THREE.Vector3(-5, 1, -10),
//         scale: new THREE.Vector3(0.5, 0.5, 0.5),
//         modelPath: '/assets/models/misaka_mikoto_preview.glb',
//         info: {
//           title: "Modern Figure",
//           description: "Bronze sculpture by contemporary artist"
//         }
//       },
//       {
//         position: new THREE.Vector3(5, 1, -10),
//         scale: new THREE.Vector3(0.7, 0.7, 0.7),
//         modelPath: '/assets/models/mazda_vision_rs__www.vecarz.com.glb',
//         info: {
//           title: "Abstract Form",
//           description: "Marble abstract piece from 2022"
//         }
//       }
//     ];

//     for (const sculpture of sculptures) {
//       let model;
//       try {
//         const gltf = await loadModel(sculpture.modelPath);
//         model = gltf;
//       } catch (error) {
//         console.error(`Failed to load model: ${sculpture.modelPath}`, error);
//         // Create fallback cube
//         model = new THREE.Mesh(
//           new THREE.BoxGeometry(1, 1, 1),
//           new THREE.MeshStandardMaterial({ color: 0xff0000 })
//         );
//       }

//       model.position.copy(sculpture.position);
//       model.scale.copy(sculpture.scale);
//       model.traverse(child => {
//         if (child.isMesh) {
//           child.castShadow = true;
//           child.receiveShadow = true;
//         }
//       });
//       model.userData = sculpture.info;
//       scene.add(model);
//       artworks.push(model);

//       // Add rotating pedestal
//       const pedestal = new Pedestal();
//       pedestal.mesh.position.copy(sculpture.position);
//       pedestal.mesh.position.y = 0.1;
//       scene.add(pedestal.mesh);
//     }

//     // Setup interactions after artworks are loaded
//     setupRaycaster(camera, scene, artworks);

//   } catch (error) {
//     console.error('Error loading artworks:', error);
//   }
// }
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { setupLights, updateMovingLights } from "./lights.js";
import {
  setupOrbitControls,
  setupPointerLockControls,
  toggleControls,
  activeControl,
  orbitControls,
  pointerControls,
} from "./controls.js";
import { initPostProcessing } from "./postprocessing.js";
import { setupRaycaster } from "./interactions.js";
import { Artwork } from "./classes/Artwork.js";
import { Pedestal } from "./classes/Pedestal.js";
import { loadModel, textureLoader, gltfLoader } from "./utils/loaders.js";

// Global variables
let scene, camera, renderer, composer;
let artworks = [];
let clock = new THREE.Clock();
let loadingManager;

export function initGallery() {
  try {
    setupLoadingManager();

    // Scene setup with artistic wooden design
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333); // Darker background for contrast
    scene.fog = new THREE.Fog(0x333333, 20, 40); // Adjusted fog

    // Enhanced camera settings
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.05,
      100
    );
    camera.position.set(0, 1.6, 5);
    camera.lookAt(0, 1.6, -10);

    // Enhanced renderer settings
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.NoToneMapping;
    document.getElementById("app").appendChild(renderer.domElement);

    // Lighting
    setupLights(scene);

    // Controls
    setupOrbitControls(camera, renderer.domElement);
    setupPointerLockControls(camera, renderer.domElement);
    orbitControls.target.set(0, 1.6, -10);
    orbitControls.update();

    // Gallery structure with wooden design
    createGalleryStructure();

    // Load artworks
    loadArtworks();

    // Post-processing
    composer = initPostProcessing(renderer, scene, camera);

    // Event listeners
    setupEventListeners();

    // Animation loop
    animate();
  } catch (error) {
    console.error("Gallery initialization failed:", error);
    document.getElementById("loading-screen").innerHTML = `
      <h1>Error Loading Gallery</h1>
      <p>${error.message}</p>
      <p>Check console for details</p>
    `;
  }
}

function setupLoadingManager() {
  loadingManager = new THREE.LoadingManager();

  loadingManager.onStart = () => {
    document.getElementById("loading-screen").style.display = "flex";
  };

  loadingManager.onProgress = (url, loaded, total) => {
    const progress = (loaded / total) * 100;
    document.querySelector(".progress-bar").style.width = `${progress}%`;
  };

  loadingManager.onLoad = () => {
    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
    }, 500);
  };

  loadingManager.onError = (url) => {
    console.error(`Error loading: ${url}`);
    document.querySelector(".progress-bar").style.background = "#ff0000";
  };

  textureLoader.manager = loadingManager;
  gltfLoader.manager = loadingManager;
}

function createGalleryStructure() {
  // Wooden floor
  const floorTexture = textureLoader.load("/assets/textures/wood_floor.jpg");
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(4, 4);
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.7,
    metalness: 0.1,
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Wood panel walls
  const wallTexture = textureLoader.load("/assets/textures/wood_panel.jpg");
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(2, 1);
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTexture,
    roughness: 0.6,
    metalness: 0.05,
  });

  const wallPositions = [
    [0, 5, -15, 0], // Back wall
    [-15, 5, 0, Math.PI / 2], // Left wall
    [15, 5, 0, Math.PI / 2], // Right wall
  ];

  wallPositions.forEach((pos) => {
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(30, 10, 0.2),
      wallMaterial
    );
    wall.position.set(pos[0], pos[1], pos[2]);
    wall.rotation.y = pos[3];
    wall.castShadow = true;
    wall.receiveShadow = true;
    scene.add(wall);
  });

  // Ceiling with wooden beams
  const ceilingTexture = textureLoader.load(
    "/assets/textures/wood_ceiling.jpg"
  );
  ceilingTexture.wrapS = ceilingTexture.wrapT = THREE.RepeatWrapping;
  ceilingTexture.repeat.set(4, 4);
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: ceilingTexture,
      roughness: 0.8,
    })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 10;
  ceiling.receiveShadow = true;
  scene.add(ceiling);

  // Add decorative elements
  addGalleryDecorations();
}

function addGalleryDecorations() {
  // Wooden pillars
  const pillarGeometry = new THREE.CylinderGeometry(0.3, 0.3, 10, 8);
  const pillarMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.7,
  });

  const pillarPositions = [
    [-14.5, 5, -14.5],
    [14.5, 5, -14.5],
    [-14.5, 5, 14.5],
    [14.5, 5, 14.5],
  ];

  pillarPositions.forEach((pos) => {
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar.position.set(pos[0], pos[1], pos[2]);
    pillar.castShadow = true;
    scene.add(pillar);
  });

  // Gallery lighting fixtures
  const lightGeometry = new THREE.SphereGeometry(0.5, 16, 8);
  const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffcc });

  const lightPositions = [
    [-10, 9.5, -10],
    [10, 9.5, -10],
    [-10, 9.5, 5],
    [10, 9.5, 5],
  ];

  lightPositions.forEach((pos) => {
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(pos[0], pos[1], pos[2]);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffeedd, 1.5, 10);
    pointLight.position.set(pos[0], pos[1] - 0.5, pos[2]);
    scene.add(pointLight);
  });
}

async function loadArtworks() {
  try {
    // 2D Artworks with proper sizing and arrangement
    const paintings = [
      // Left wall
      {
        position: new THREE.Vector3(-14, 4.9, -8),
        rotation: new THREE.Euler(0, Math.PI / 2, 0),
        config: {
          texturePath: "/assets/artworks/a1.jpg",
          size: { width: 3, height: 4 }, // Standard portrait size
          frame: { thickness: 0.2, depth: 0.1, color: 0x8b4513 },
        },
        info: {
          title: "Abstract Thoughts",
          description: "Expressionist oil painting from 2023",
        },
      },
      // Right wall
      {
        position: new THREE.Vector3(14, 4.9, -8),
        rotation: new THREE.Euler(0, -Math.PI / 2, 0),
        config: {
          texturePath: "/assets/artworks/art02.jpg",
          size: { width: 3, height: 4 },
          frame: { thickness: 0.2, depth: 0.1, color: 0x8b4513 },
        },
        info: {
          title:"Contours of Thought",
          description:"Rendered solely in pencil, this study of Socrates captures the philosopher’s contemplative gaze and timeless presence—stripped of color, yet rich in depth and wisdom."
        },
      },
      // Back wall - center
      {
        position: new THREE.Vector3(0, 5.8, -14.8),
        rotation: new THREE.Euler(0, 0, 0),
        config: {
          texturePath: "/assets/artworks/images.jpg",
          size: { width: 5, height: 3 },
          frame: { thickness: 0.2, depth: 0.1, color: 0x8b4513 },
        },
        info: {
          title: "Dusk Over Fields",
          description: "A warm countryside sunset bathes open fields in amber light, capturing nature’s quiet farewell to the day.",
        },
      },
      // Back wall - left
      {
        position: new THREE.Vector3(-6, 5.2, -14.8),
        rotation: new THREE.Euler(0, 0, 0),
        config: {
          texturePath: "/assets/artworks/a2.jpg",
          size: { width: 3, height: 4 },
          frame: { thickness: 0.2, depth: 0.1, color: 0x8b4513 },
        },
        info: {
          title: "The Maskal Flower",
          description: "Afewerk Tekle, 1959 (Expressionism)",
        },
      },
      // Back wall - right
      {
        position: new THREE.Vector3(6, 5.2, -14.8),
        rotation: new THREE.Euler(0, 0, 0),
        config: {
          texturePath: "/assets/artworks/art03.jpg",
          size: { width: 3, height: 4 },
          frame: { thickness: 0.2, depth: 0.1, color: 0x8b4513 },
        },
        info: {
          title: "Convergence of Intention",
          description: "Two abstracted hands extend toward one another—suspended in a moment where touch is imminent but unrealized, capturing the tension between desire and distance.",
        },
      },

      // additonal art work
      {
      position: new THREE.Vector3(-14, 4.9, -3),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
      config: {
        texturePath: "/assets/artworks/art_07.jpg",
        size: { width: 3, height: 4 },
        frame: { thickness: 0.2, depth: 0.1, color: 0x8b4513 },
      },
      info: {
        title: "Elegance of Tradition",
        description: "A vibrant painting that captures the rich cultural heritage of Ethiopia.",
      },
    },

    ];

    for (const painting of paintings) {
      const artwork = new Artwork("2d", painting.config, renderer);
      artwork.mesh.position.copy(painting.position);
      artwork.mesh.rotation.copy(painting.rotation);
      artwork.mesh.userData = painting.info;
      scene.add(artwork.mesh);
      artworks.push(artwork.mesh);
    }

    // 3D Artworks - original plus 4 new sculptures
    const sculptures = [
      // Original sculptures
      {
        position: new THREE.Vector3(-5, 0.5, -10),
        scale: new THREE.Vector3(1.5, 1.5, 1.5),
        modelPath: "/assets/models/aphrodite_crouching_british_museum.glb",
        info: {
          title: "Modern Figure",
          description: "Bronze sculpture by contemporary artist",
        },
      },
      // one with freezy hair 
      {
        position: new THREE.Vector3(5, -0.1, -10),
        scale: new THREE.Vector3(1.5, 1.5, 1.5),
        modelPath: "/assets/models/bust_of_marcus_aurelius.glb",
        info: {
          title: "Abstract Form",
          description: "Marble abstract piece from 2022",
        },
      },
      // New sculptures
      // the black-one
      {
        position: new THREE.Vector3(-6, 1.5, -1),
        scale: new THREE.Vector3(0.3, 0.3, 0.3),
        modelPath: "/assets/models/statue_of_edward_snowden.glb",
        info: {
          title: "Classical Statue",
          description: "Neoclassical marble sculpture, 19th century",
        },
      },
      // one with long beard
      {
        position: new THREE.Vector3(6, 0.5, -1),
        scale: new THREE.Vector3(0.1, 0.1, 0.1),
        modelPath: "/assets/models/figurehead_of_hms_thames_1823_incomplete.glb",
        info: {
          title: "Modern Abstract",
          description: "Contemporary steel sculpture, 2021",
        },
      },
      {
        position: new THREE.Vector3(0, 0.2, -12),
        scale: new THREE.Vector3(0.1, 0.1, 0.1),
        modelPath: "/assets/models/sylvanus.glb",
        info: {
          title: "Minimalist Form",
          description: "Contemporary minimalist sculpture",
        },
      },
    ];

    for (const sculpture of sculptures) {
      let model;
      try {
        const gltf = await loadModel(sculpture.modelPath);
        model = gltf;
      } catch (error) {
        console.error(`Failed to load model: ${sculpture.modelPath}`, error);
        model = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 0xff0000 })
        );
      }

      model.position.copy(sculpture.position);
      model.scale.copy(sculpture.scale);
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      model.userData = sculpture.info;
      scene.add(model);
      artworks.push(model);

      // Add rotating pedestal
      const pedestal = new Pedestal();
      pedestal.mesh.position.copy(sculpture.position);
      pedestal.mesh.position.y = 0.1;
      scene.add(pedestal.mesh);
    }

    // Setup interactions
    setupRaycaster(camera, scene, artworks);
  } catch (error) {
    console.error("Error loading artworks:", error);
  }
}

function setupEventListeners() {
  // Window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (composer) {
      composer.setSize(window.innerWidth, window.innerHeight);
    }
  });

  // Toggle controls button
  document
    .getElementById("toggle-controls")
    .addEventListener("click", toggleControls);

  // Escape key to exit pointer lock
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeControl === "pointer") {
      pointerControls.unlock();
      orbitControls.enabled = true;
      activeControl = "orbit";
    }
  });
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  // Update controls
  if (activeControl === "orbit" && orbitControls) {
    orbitControls.update();
  }

  // Rotate pedestals
  scene.traverse((obj) => {
    if (obj.userData && obj.userData.type === "pedestal") {
      obj.rotation.y += delta * 0.5;
    }
  });

  // Update moving lights
  updateMovingLights(scene, delta);

  // Render with post-processing
  if (composer) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}
