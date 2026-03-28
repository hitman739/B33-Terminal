import { useEffect, type RefObject } from 'react'
import * as THREE from 'three'
import { createParticles, disposeParticles } from '../utils/createParticles'

export function useHeroScene(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // INIT — test WebGL, create renderer/scene/camera
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    // GEOMETRY — IcosahedronGeometry wireframe mesh
    const icoGeo = new THREE.IcosahedronGeometry(2, 4)
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a00,
      emissive: new THREE.Color(0xd4ff00),
      emissiveIntensity: 0.55,
      roughness: 0.2,
      metalness: 0.8,
    })
    const icosahedron = new THREE.Mesh(icoGeo, icoMat)
    scene.add(icosahedron)

    const wireGeo = new THREE.IcosahedronGeometry(2.01, 4)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    })
    const wireframe = new THREE.Mesh(wireGeo, wireMat)
    scene.add(wireframe)

    // LIGHTS
    const pointLight = new THREE.PointLight(0xd4ff00, 3, 20)
    pointLight.position.set(3, 3, 3)
    scene.add(pointLight)
    // Pulsing fill light — synced with HeroAtmosphere blob period (~5s)
    const pulseLight = new THREE.PointLight(0xffc107, 2, 15)
    pulseLight.position.set(-2, 1, 4)
    scene.add(pulseLight)
    const ambientLight = new THREE.AmbientLight(0x111100, 0.5)
    scene.add(ambientLight)

    // PARTICLES
    const particles = createParticles(scene, 60)

    // ANIMATION
    let animId: number
    const BOUNDS = 5.5

    function animate() {
      animId = requestAnimationFrame(animate)

      icosahedron.rotation.x += 0.001
      icosahedron.rotation.y += 0.002
      icosahedron.rotation.z += 0.0005
      wireframe.rotation.copy(icosahedron.rotation)

      // Pulse fill light in sync with HeroAtmosphere blob (5s period)
      const t = Date.now() * 0.001
      pulseLight.intensity = 1.5 + 1.5 * Math.sin(t * (Math.PI * 2 / 5))

      for (const p of particles) {
        p.mesh.position.add(p.velocity)
        if (Math.abs(p.mesh.position.x) > BOUNDS) p.velocity.x *= -1
        if (Math.abs(p.mesh.position.y) > BOUNDS) p.velocity.y *= -1
        if (Math.abs(p.mesh.position.z) > BOUNDS) p.velocity.z *= -1
      }

      renderer.render(scene, camera)
    }
    animate()

    // RESIZE
    function onResize() {
      if (!canvas) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // CLEANUP
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      disposeParticles(particles, scene)
      icoGeo.dispose()
      icoMat.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      renderer.dispose()
      scene.remove(pulseLight)
    }
  }, [canvasRef])
}
