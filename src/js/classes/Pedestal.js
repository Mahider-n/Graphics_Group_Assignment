// src/js/classes/Pedestal.js
import * as THREE from 'three';

export class Pedestal {
  constructor(radius = 1.2, height = 0.2) {
    this.radius = radius;
    this.height = height;
    this.mesh = this.createPedestal();
    this.mesh.userData = { type: 'pedestal' };
  }

  createPedestal() {
    const geometry = new THREE.CylinderGeometry(
      this.radius, 
      this.radius * 1.1, 
      this.height, 
      32
    );
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x888888,
      roughness: 0.7,
      metalness: 0.3
    });
    const pedestal = new THREE.Mesh(geometry, material);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    return pedestal;
  }
}