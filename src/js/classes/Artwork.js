import * as THREE from 'three';
import { textureLoader } from '../utils/loaders.js';

export class Artwork {
  constructor(type, config, renderer) {
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
    
    // Load texture with optimized settings
    const texture = textureLoader.load(texturePath, (texture) => {
      texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.encoding = THREE.sRGBEncoding;
    });
    
    // Painting with higher quality settings
    const geometry = new THREE.PlaneGeometry(size.width, size.height, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const painting = new THREE.Mesh(geometry, material);
    painting.renderOrder = 1; // Ensure proper rendering order
    group.add(painting);
    
    // Frame
    if (frame) {
      const frameGeometry = new THREE.BoxGeometry(
        size.width + frame.thickness, 
        size.height + frame.thickness, 
        frame.depth,
        1, 1, 1
      );
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: frame.color,
        roughness: 0.4,
        metalness: 0.2
      });
      const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
      frameMesh.position.z = -frame.depth/2 - 0.01;
      frameMesh.renderOrder = 0;
      group.add(frameMesh);
    }
    
    return group;
  }

  create3DArtwork() {
    return new THREE.Group();
  }
}