export function setupInteractions(camera, scene, renderer) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const interactiveObjects = [];
  
  // Find all interactive objects
  scene.traverse(child => {
    if (child.userData.interactive) {
      interactiveObjects.push(child);
    }
  });
  
  // Mouse events
  window.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects);
    
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      showArtInfo(obj.userData);
    }
  });
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects);
    
    document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'auto';
  });
  
  // Info panel close button
  document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('info-panel').classList.add('hidden');
  });
}

function showArtInfo(artData) {
  document.getElementById('art-title').textContent = artData.title;
  document.getElementById('art-description').textContent = artData.description;
  document.getElementById('info-panel').classList.remove('hidden');
}