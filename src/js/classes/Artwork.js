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
    } else {
      return this.create3DArtwork();
    }
  }

  create2DArtwork() {
    const { texturePath, size, frame } = this.config;
    const group = new THREE.Group();
    
    // Painting
    const texture = textureLoader.load(texturePath, (texture) => {
      // Only apply these settings if renderer is available
      if (this.renderer) {
        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      }
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.encoding = THREE.sRGBEncoding;
    });
    
    const geometry = new THREE.PlaneGeometry(size.width, size.height);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.3,
      metalness: 0.1
    });
    const painting = new THREE.Mesh(geometry, material);
    group.add(painting);
    
    // Frame (unchanged)
    if (frame) {
      const frameGeometry = new THREE.BoxGeometry(
        size.width + frame.thickness, 
        size.height + frame.thickness, 
        frame.depth
      );
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: frame.color,
        roughness: 0.4,
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