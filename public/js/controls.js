import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export function setupControls(camera, renderer) {
  // Orbit controls
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.05;
  
  // Pointer lock controls
  const pointerControls = new PointerLockControls(camera, document.body);
  
  // Toggle mechanism
  document.addEventListener('keydown', (e) => {
    if (e.key === 'c' || e.key === 'C') {
      if (activeControls === orbitControls) {
        pointerControls.lock();
      } else {
        pointerControls.unlock();
      }
    }
  });
  
  pointerControls.addEventListener('lock', () => {
    activeControls = pointerControls;
    orbitControls.enabled = false;
  });
  
  pointerControls.addEventListener('unlock', () => {
    activeControls = orbitControls;
    orbitControls.enabled = true;
  });
  
  return { orbitControls, pointerControls };
}