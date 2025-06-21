import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const textureLoader = new THREE.TextureLoader();
export const gltfLoader = new GLTFLoader();

export async function loadModel(path) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(path, (gltf) => {
      resolve(gltf.scene);
    }, undefined, reject);
  });
}

export async function loadTexture(path) {
  return new Promise((resolve) => {
    textureLoader.load(path, resolve);
  });
}
// export {textureLoader};