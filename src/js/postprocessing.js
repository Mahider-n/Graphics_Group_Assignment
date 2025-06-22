// import * as THREE from 'three';
// import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
// import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';

// let composer;

// export function initPostProcessing(renderer, scene, camera) {
//   composer = new EffectComposer(renderer);
  
//   // Render pass
//   const renderPass = new RenderPass(scene, camera);
//   composer.addPass(renderPass);
  
//   // Bloom effect
//   const bloomPass = new UnrealBloomPass(
//     new THREE.Vector2(window.innerWidth, window.innerHeight),
//     1.5, // strength
//     0.4, // radius
//     0.85 // threshold
//   );
//   composer.addPass(bloomPass);
  
//   // Depth of field
//   const bokehPass = new BokehPass(
//     scene,
//     camera,
//     {
//       focus: 10,
//       aperture: 0.025,
//       maxblur: 0.01
//     }
//   );
//   composer.addPass(bokehPass);
  
//   return composer;
// }
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

let composer;

export function initPostProcessing(renderer, scene, camera) {
  composer = new EffectComposer(renderer);
  
  // Render pass
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  
  // Subtle bloom effect
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.6,  // Reduced strength
    0.2,  // Reduced radius
    0.8   // Increased threshold
  );
  composer.addPass(bloomPass);
  
  // Optional: SMAA for better anti-aliasing
  if (renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2) {
    const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
    composer.addPass(smaaPass);
  }
  
  return composer;
}