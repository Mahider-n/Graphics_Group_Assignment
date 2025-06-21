import * as THREE from 'three';

export class Artwork {
  constructor(type, config) {
    this.type = type;
    this.config = config;
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
    const geometry = new THREE.PlaneGeometry(size.width, size.height);
    const material = new THREE.MeshStandardMaterial({
      map: textureLoader.load(texturePath),
      roughness: 0.3
    });
    const painting = new THREE.Mesh(geometry, material);
    group.add(painting);
    
    // Frame
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
    // Will be implemented in Phase 2
    return new THREE.Group();
  }
}