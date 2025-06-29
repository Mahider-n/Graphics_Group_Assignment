
// interactions.js
import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersectedObject = null;

export function setupRaycaster(camera, scene, artworks) {
  window.addEventListener('click', (event) => {
    // Calculate mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    // Raycast
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(artworks);
    
    if (intersects.length > 0) {
      showArtworkInfo(intersects[0].object.userData);
    }
  });
}

function showArtworkInfo(data) {
  const infoPanel = document.getElementById('artwork-info');
  infoPanel.querySelector('#artwork-title').textContent = data.title;
  infoPanel.querySelector('#artwork-description').textContent = data.description;
  infoPanel.classList.add('visible');
  
  setTimeout(() => {
    infoPanel.classList.remove('visible');
  }, 5000);
}