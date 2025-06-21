import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

let orbitControls, pointerControls;
let activeControl = 'orbit';

export function setupOrbitControls(camera, domElement) {
  orbitControls = new OrbitControls(camera, domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.05;
  return orbitControls;
}

export function setupPointerLockControls(camera, domElement) {
  pointerControls = new PointerLockControls(camera, domElement);
  return pointerControls;
}

export function toggleControls() {
  if (activeControl === 'orbit') {
    orbitControls.enabled = false;
    pointerControls.lock();
    activeControl = 'pointer';
  } else {
    pointerControls.unlock();
    orbitControls.enabled = true;
    activeControl = 'orbit';
  }
}

// Add event listener in main.js
document.getElementById('toggle-controls').addEventListener('click', toggleControls);