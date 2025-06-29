
// postprocessing,js
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

let composer;

export function initPostProcessing(renderer, scene, camera) {
  composer = new EffectComposer(renderer);
  
  // 1. Basic render pass (keep this)
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // 2. More subtle bloom with tighter radius
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.4,  // Reduced strength (was 1.5)
    0.1,  // Smaller radius (was 0.4)
    0.9   // Higher threshold (was 0.85)
  );
  composer.addPass(bloomPass);

  // 3. Optional: Add output pass for better color handling
  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  return composer;
}