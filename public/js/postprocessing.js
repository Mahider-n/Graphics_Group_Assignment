import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BloomPass } from 'three/addons/postprocessing/BloomPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';

export function setupPostProcessing(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  
  // Render pass
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  
  // Bloom effect
  const bloomPass = new BloomPass(1.5, 25, 0.1, 256);
  composer.addPass(bloomPass);
  
  // Depth of field
  const bokehPass = new BokehPass(scene, camera, {
    focus: 10,
    aperture: 0.025,
    maxblur: 0.01
  });
  composer.addPass(bokehPass);
  
  // Update in animation loop
  const originalAnimate = window.animate;
  window.animate = () => {
    originalAnimate();
    composer.render();
  };
}