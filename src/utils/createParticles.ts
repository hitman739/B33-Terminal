import * as THREE from 'three'

export interface Particle {
  mesh: THREE.Mesh
  velocity: THREE.Vector3
}

export function createParticles(scene: THREE.Scene, count = 60): Particle[] {
  const particles: Particle[] = []
  const geo = new THREE.SphereGeometry(0.03, 6, 6)
  const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xd4ff00), transparent: true, opacity: 0.5 })

  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(geo, mat.clone())
    const r = Math.random() * 5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    mesh.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    )
    scene.add(mesh)
    particles.push({
      mesh,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
      ),
    })
  }

  return particles
}

export function disposeParticles(particles: Particle[], scene: THREE.Scene) {
  for (const p of particles) {
    scene.remove(p.mesh)
    p.mesh.geometry.dispose()
    ;(p.mesh.material as THREE.Material).dispose()
  }
}
