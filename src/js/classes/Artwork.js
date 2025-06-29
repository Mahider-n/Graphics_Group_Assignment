// artwork.js
import * as THREE from 'three';
import { textureLoader } from '../utils/loaders.js';

export class Artwork {
  constructor(type, config, renderer = null) {
    this.type = type;
    this.config = config;
    this.renderer = renderer;
    this.mesh = this.createMesh();
  }

  createMesh() {
    if (this.type === '2d') {
      return this.create2DArtwork();
    }
    return this.create3DArtwork();
  }

  create2DArtwork() {
    const { texturePath, size, frame } = this.config;
    const group = new THREE.Group();
    
    // Load texture with optimized settings
    const texture = textureLoader.load(texturePath, (texture) => {
      if (this.renderer) {
        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      }
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.encoding = THREE.sRGBEncoding;
      
      // Adjust UVs to maintain aspect ratio without stretching
      const imageAspect = texture.image.width / texture.image.height;
      const targetAspect = size.width / size.height;
      
      if (imageAspect > targetAspect) {
        texture.repeat.x = targetAspect / imageAspect;
        texture.offset.x = (1 - targetAspect / imageAspect) / 2;
      } else {
        texture.repeat.y = imageAspect / targetAspect;
        texture.offset.y = (1 - imageAspect / targetAspect) / 2;
      }
    });
    
    // Painting
    const geometry = new THREE.PlaneGeometry(size.width, size.height);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const painting = new THREE.Mesh(geometry, material);
    group.add(painting);
    
    // Enhanced frame with more detail
    if (frame) {
      const frameGeometry = new THREE.BoxGeometry(
        size.width + frame.thickness * 2, 
        size.height + frame.thickness * 2, 
        frame.depth,
        1, 1, 1
      );
      
      // Frame material with subtle grain texture
      const frameTexture = textureLoader.load('/assets/textures/wood_frame.jpg');
      frameTexture.wrapS = frameTexture.wrapT = THREE.RepeatWrapping;
      frameTexture.repeat.set(1, 4);
      
      const frameMaterial = new THREE.MeshStandardMaterial({
        map: frameTexture,
        color: frame.color,
        roughness: 0.6,
        metalness: 0.2
      });
      
      const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
      frameMesh.position.z = -frame.depth/2 - 0.01;
      group.add(frameMesh);
    }
    
    return group;
  }

  create3DArtwork() {
    return new THREE.Group();
  }
}