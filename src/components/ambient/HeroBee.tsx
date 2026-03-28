import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroBee() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const geos: THREE.BufferGeometry[] = []
    const mats: THREE.Material[] = []
    const tg = (g: THREE.BufferGeometry) => { geos.push(g); return g }
    const tm = <T extends THREE.Material>(m: T): T => { mats.push(m); return m }

    // ── Renderer ──────────────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const initW = canvas.clientWidth  || window.innerWidth
    const initH = canvas.clientHeight || window.innerHeight
    renderer.setSize(initW, initH)
    renderer.setClearColor(0x000000, 0)

    // ── Scene + Camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, initW / initH, 0.1, 100)
    camera.position.set(0, 0, 6)

    // ── Materials ─────────────────────────────────────────────────────────────
    const ADD = THREE.AdditiveBlending
    const C   = 0xd4ff00
    const B   = { color: C, transparent: true, blending: ADD, depthWrite: false } as const

    const bodyMat  = tm(new THREE.LineBasicMaterial({ ...B, opacity: 0.75 }))
    const wireMat  = tm(new THREE.LineBasicMaterial({ ...B, opacity: 0.52 }))
    const wingMat  = tm(new THREE.LineBasicMaterial({ ...B, opacity: 0.75 }))
    const antMat   = tm(new THREE.LineBasicMaterial({ ...B, opacity: 0.90 }))
    const legMat   = tm(new THREE.LineBasicMaterial({ ...B, opacity: 0.45 }))
    const eyeMat   = tm(new THREE.MeshBasicMaterial({ ...B, opacity: 1.00 }))
    const glowMat  = tm(new THREE.MeshBasicMaterial({ ...B, opacity: 0.05, side: THREE.DoubleSide }))
    const orbMat   = tm(new THREE.PointsMaterial({ ...B, size: 0.08,  opacity: 0.90, sizeAttenuation: true }))
    const partMat  = tm(new THREE.PointsMaterial({ ...B, size: 0.055, opacity: 0.60, sizeAttenuation: true }))
    const dustMat  = tm(new THREE.PointsMaterial({ ...B, size: 0.015, opacity: 0.18, sizeAttenuation: true }))
    const pulseMat = tm(new THREE.PointsMaterial({ ...B, size: 0.13,  opacity: 1.00, sizeAttenuation: true }))

    // ── Bee Group ─────────────────────────────────────────────────────────────
    const bee = new THREE.Group()
    scene.add(bee)

    // Helper: LineSegments from WireframeGeometry, disposes source geo
    function mkWire(src: THREE.BufferGeometry, mat: THREE.LineBasicMaterial): THREE.LineSegments {
      const wg = tg(new THREE.WireframeGeometry(src))
      src.dispose()
      return new THREE.LineSegments(wg, mat)
    }

    // Helper: Line from points
    function mkLine(pts: THREE.Vector3[], mat: THREE.LineBasicMaterial): THREE.Line {
      return new THREE.Line(tg(new THREE.BufferGeometry().setFromPoints(pts)), mat)
    }

    // ── HEAD ──────────────────────────────────────────────────────────────────
    const head = mkWire(new THREE.SphereGeometry(0.28, 14, 10), bodyMat)
    head.position.set(0, 1.30, 0)
    bee.add(head)

    // Evil eyes — filled bright spheres, slightly forward, squished angular
    const eyeGeo = new THREE.SphereGeometry(0.06, 8, 6)
    tg(eyeGeo)
    ;[-1, 1].forEach(side => {
      const eye = new THREE.Mesh(eyeGeo, eyeMat)
      eye.position.set(side * 0.14, 1.34, 0.22)
      eye.scale.set(1.1, 0.80, 0.75)
      bee.add(eye)
      const el = new THREE.PointLight(C, 1.2, 2.0)
      el.position.copy(eye.position)
      bee.add(el)
    })

    // ── ANTENNAE ──────────────────────────────────────────────────────────────
    ;[-1, 1].forEach(side => {
      // Curved stem
      const stem = [
        new THREE.Vector3(side * 0.12, 1.56, 0),
        new THREE.Vector3(side * 0.20, 1.76, 0.02),
        new THREE.Vector3(side * 0.16, 1.96, 0),
      ]
      bee.add(mkLine(new THREE.CatmullRomCurve3(stem).getPoints(14), antMat))

      // ⚡ Lightning bolt at tip — 3-segment zigzag
      const tx = side * 0.16, ty = 1.96
      const boltArr = new Float32Array([
        tx + side * 0.07,  ty + 0.00, 0,
        tx - side * 0.02,  ty + 0.11, 0,
        tx + side * 0.06,  ty + 0.11, 0,
        tx - side * 0.03,  ty + 0.24, 0,
      ])
      const boltGeo = tg(new THREE.BufferGeometry())
      boltGeo.setAttribute('position', new THREE.BufferAttribute(boltArr, 3))
      bee.add(new THREE.Line(boltGeo, antMat))
    })

    // ── THORAX ────────────────────────────────────────────────────────────────
    const thorax = mkWire(new THREE.SphereGeometry(0.26, 12, 8), bodyMat)
    thorax.position.set(0, 0.70, 0)
    thorax.scale.set(1.15, 0.82, 0.78)
    bee.add(thorax)

    // ── ABDOMEN — LatheGeometry gives real mesh wireframe with horizontal rings ─
    const abdProfile: THREE.Vector2[] = [
      new THREE.Vector2(0.04,  0.52),
      new THREE.Vector2(0.24,  0.40),
      new THREE.Vector2(0.40,  0.17),
      new THREE.Vector2(0.44, -0.06),
      new THREE.Vector2(0.42, -0.28),
      new THREE.Vector2(0.37, -0.50),
      new THREE.Vector2(0.28, -0.70),
      new THREE.Vector2(0.18, -0.88),
      new THREE.Vector2(0.08, -1.02),
      new THREE.Vector2(0.02, -1.14),
    ]
    bee.add(mkWire(new THREE.LatheGeometry(abdProfile, 14), wireMat))

    // Segment stripe rings — each gets its own material for sequential flash
    const STRIPE_YS = [ 0.17, -0.06, -0.28, -0.50, -0.70]
    const STRIPE_RS = [0.40,  0.44,  0.42,  0.37,  0.28]
    const stripeMats: THREE.LineBasicMaterial[] = []
    STRIPE_YS.forEach((y, i) => {
      const r   = STRIPE_RS[i]
      const mat = tm(new THREE.LineBasicMaterial({ ...B, opacity: 0.72 }))
      stripeMats.push(mat)
      const pts = Array.from({ length: 32 }, (_, k) => {
        const a = (k / 32) * Math.PI * 2
        return new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r)
      })
      bee.add(new THREE.LineLoop(tg(new THREE.BufferGeometry().setFromPoints(pts)), mat))
    })

    // ── STINGER ───────────────────────────────────────────────────────────────
    const stinger = mkWire(new THREE.ConeGeometry(0.07, 0.48, 8), bodyMat)
    stinger.position.set(0, -1.46, 0)
    stinger.rotation.z = Math.PI
    bee.add(stinger)

    // ── LEGS — 6 total, 3 per side, 2 segments each ───────────────────────────
    const LEG_DEFS = [
      { y: 0.66, spread: 1.20, droop: -0.18 },
      { y: 0.46, spread: 1.30, droop: -0.28 },
      { y: 0.24, spread: 1.10, droop: -0.40 },
    ]
    LEG_DEFS.forEach(({ y, spread, droop }) => {
      ;[-1, 1].forEach(side => {
        bee.add(mkLine([
          new THREE.Vector3(side * 0.26, y, 0),
          new THREE.Vector3(side * (0.26 + spread * 0.5), y + droop * 0.4, side * 0.05),
          new THREE.Vector3(side * (0.26 + spread),       y + droop,       side * 0.08),
        ], legMat))
      })
    })

    // ── WINGS — ShapeGeometry → WireframeGeometry (dense triangulation mesh) ──
    const wingGroupUpper: THREE.Group[] = []
    const wingGroupLower: THREE.Group[] = []

    // s = 1 → left wing extends -X; s = -1 → right wing extends +X (mirror)
    function buildWing(isUpper: boolean, isRight: boolean): THREE.Group {
      const grp = new THREE.Group()
      const s   = isRight ? -1 : 1
      const shape = new THREE.Shape()

      if (isUpper) {
        // Aggressive swept delta — all sharp corners, no rounding
        shape.moveTo(0, 0)
        shape.lineTo(s * -0.55,  0.70)   // sharp leading edge sweep up
        shape.lineTo(s * -1.90,  1.35)   // drive toward tip
        shape.lineTo(s * -3.25,  1.05)   // pointed forward tip
        shape.lineTo(s * -3.75,  0.50)   // tip trailing corner
        shape.lineTo(s * -3.35, -0.02)   // sharp lower trailing edge
        shape.lineTo(s * -2.10, -0.24)   // concave notch (predator look)
        shape.lineTo(s * -0.32, -0.10)   // back to thorax
        shape.lineTo(0, 0)
      } else {
        // Lower wing — narrow blade, swept back
        shape.moveTo(0, 0)
        shape.lineTo(s * -0.42,  0.15)   // leading edge
        shape.lineTo(s * -1.55,  0.24)   // forward sweep
        shape.lineTo(s * -2.35,  0.04)   // approach tip
        shape.lineTo(s * -2.72, -0.14)   // sharp pointed tip
        shape.lineTo(s * -2.25, -0.48)   // trailing corner
        shape.lineTo(s * -1.30, -0.58)   // lower trailing blade
        shape.lineTo(s * -0.22, -0.16)   // back to thorax
        shape.lineTo(0, 0)
      }

      // 20 curveSegments gives a dense interior triangulation → wireframe grid
      const shapeGeo = new THREE.ShapeGeometry(shape, 20)
      grp.add(new THREE.LineSegments(tg(new THREE.WireframeGeometry(shapeGeo)), wingMat))
      shapeGeo.dispose()

      grp.position.set(
        isRight ? 0.28 : -0.28,
        isUpper ? 0.70 : 0.44,
        isUpper ? 0.02 : -0.02,
      )
      return grp
    }

    ;[false, true].forEach(isRight => {
      const upper = buildWing(true,  isRight)
      const lower = buildWing(false, isRight)
      bee.add(upper, lower)
      wingGroupUpper.push(upper)
      wingGroupLower.push(lower)
    })

    // ── GLOW DISC ─────────────────────────────────────────────────────────────
    const glowDisc = new THREE.Mesh(tg(new THREE.CircleGeometry(3.8, 32)), glowMat)
    glowDisc.position.set(0, 0, -0.4)
    bee.add(glowDisc)

    // ── LIGHTS ────────────────────────────────────────────────────────────────
    const beeLight = new THREE.PointLight(C, 3.5, 7)
    beeLight.position.set(0, 0, 0.5)
    bee.add(beeLight)
    scene.add(new THREE.AmbientLight(0x0c0e00, 0.4))

    // ── ENERGY ORBS — orbit loosely around bee ────────────────────────────────
    const ORB_N    = 24
    const orbPos   = new Float32Array(ORB_N * 3)
    const orbPhase = Float32Array.from({ length: ORB_N }, (_, i) => (i / ORB_N) * Math.PI * 2 + Math.random() * 0.5)
    const orbRad   = Float32Array.from({ length: ORB_N }, () => 1.1 + Math.random() * 1.4)
    const orbSpd   = Float32Array.from({ length: ORB_N }, () => 0.35 + Math.random() * 0.8)
    const orbY     = Float32Array.from({ length: ORB_N }, () => -0.9 + Math.random() * 2.0)
    const orbGeo   = tg(new THREE.BufferGeometry())
    orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPos, 3))
    bee.add(new THREE.Points(orbGeo, orbMat))

    // ── BODY GLOW PARTICLES — distributed along full body silhouette ──────────
    const BP     = 260
    const bPos   = new Float32Array(BP * 3)
    const bBase  = new Float32Array(BP * 3)
    const bPhase = Float32Array.from({ length: BP }, () => Math.random() * Math.PI * 2)

    for (let i = 0; i < BP; i++) {
      const bodyY = 1.55 - Math.random() * 2.95
      const r = Math.max(0.02, bodyY > 1.0
        ? 0.28 * (1 - (bodyY - 1.0) / 0.55)
        : 0.44 * Math.sin(Math.max(0, (bodyY + 1.14) / 1.68) * Math.PI)
      )
      const a = Math.random() * Math.PI * 2
      bBase[i*3]   = Math.cos(a) * r * (0.7 + Math.random() * 0.6)
      bBase[i*3+1] = bodyY
      bBase[i*3+2] = Math.sin(a) * r * (0.7 + Math.random() * 0.6)
    }
    const bGeo = tg(new THREE.BufferGeometry())
    bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3))
    bee.add(new THREE.Points(bGeo, partMat))

    // ── BODY LIGHT PULSES — dots traveling thorax → stinger (data flow) ───────
    const PULSE_N  = 8
    const pulsePos = new Float32Array(PULSE_N * 3)
    const pulseGeo = tg(new THREE.BufferGeometry())
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3))
    bee.add(new THREE.Points(pulseGeo, pulseMat))

    // ── AMBIENT DUST ──────────────────────────────────────────────────────────
    const DUST  = 480
    const BOUND = 7
    const dPos  = new Float32Array(DUST * 3)
    const dVel  = new Float32Array(DUST * 3)
    for (let i = 0; i < DUST; i++) {
      dPos[i*3]   = (Math.random() - 0.5) * BOUND * 2
      dPos[i*3+1] = (Math.random() - 0.5) * BOUND * 2
      dPos[i*3+2] = (Math.random() - 0.5) * BOUND * 2
      dVel[i*3]   = (Math.random() - 0.5) * 0.004
      dVel[i*3+1] = (Math.random() - 0.5) * 0.004
      dVel[i*3+2] = (Math.random() - 0.5) * 0.003
    }
    const dGeo = tg(new THREE.BufferGeometry())
    dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3))
    scene.add(new THREE.Points(dGeo, dustMat))

    // ── ATMOSPHERIC UPWARD DRIFT ──────────────────────────────────────────────
    const ATMO      = 1800
    const AYMIN     = -10
    const AYMAX     = 10
    const atmoPos   = new Float32Array(ATMO * 3)
    for (let i = 0; i < ATMO; i++) {
      atmoPos[i*3]   = (Math.random() - 0.5) * 28
      atmoPos[i*3+1] = AYMIN + Math.random() * (AYMAX - AYMIN)
      atmoPos[i*3+2] = -(2 + Math.random() * 5)
    }
    const atmoGeo = tg(new THREE.BufferGeometry())
    atmoGeo.setAttribute('position', new THREE.BufferAttribute(atmoPos, 3))
    const atmoMat = tm(new THREE.PointsMaterial({
      color: C, size: 0.008, transparent: true, opacity: 0.14,
      blending: ADD, depthWrite: false, sizeAttenuation: true,
    }))
    scene.add(new THREE.Points(atmoGeo, atmoMat))

    // ── SCALE TO VIEWPORT ─────────────────────────────────────────────────────
    // BEE_SPAN covers wing-tip-to-wing-tip in world units
    const BEE_SPAN = 8.2
    function scaleToFit() {
      const vFOV = camera.fov * (Math.PI / 180)
      const vh   = 2 * Math.tan(vFOV / 2) * camera.position.z
      bee.scale.setScalar((vh * camera.aspect * 0.74) / BEE_SPAN)
    }
    scaleToFit()

    // ── MOUSE PARALLAX ────────────────────────────────────────────────────────
    const mouse  = { x: 0, y: 0 }
    const lerped = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x =   (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── ANIMATION LOOP ────────────────────────────────────────────────────────
    let animId: number
    const orbAttr   = orbGeo.attributes.position  as THREE.BufferAttribute
    const bAttr     = bGeo.attributes.position    as THREE.BufferAttribute
    const dAttr     = dGeo.attributes.position    as THREE.BufferAttribute
    const atmoAttr  = atmoGeo.attributes.position as THREE.BufferAttribute
    const pulseAttr = pulseGeo.attributes.position as THREE.BufferAttribute

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = performance.now() * 0.001

      // ── Wing flap — very fast (28 rad/s), opacity flicker = motion blur feel
      const ff = 28
      const uf = Math.sin(t * ff) * 0.50
      const lf = Math.sin(t * ff + 0.5) * 0.30
      wingGroupUpper[0].rotation.z =  uf
      wingGroupUpper[1].rotation.z = -uf
      wingGroupLower[0].rotation.z =  lf
      wingGroupLower[1].rotation.z = -lf
      wingMat.opacity = 0.48 + 0.45 * Math.abs(Math.sin(t * ff))

      // ── Hover drift — alive, not static
      bee.position.y = Math.sin(t * 0.55) * 0.11

      // ── Micro-rotation — avoids stiffness
      bee.rotation.z = Math.sin(t * 1.9) * 0.016

      // ── Mouse parallax (smooth lerp)
      lerped.x += (mouse.x * 0.14 - lerped.x) * 0.03
      lerped.y += (mouse.y * 0.09 - lerped.y) * 0.03
      bee.rotation.y =  lerped.x
      bee.rotation.x = -lerped.y + Math.sin(t * 1.1) * 0.012

      // ── Central glow pulse
      beeLight.intensity = 2.8 + 1.8 * Math.abs(Math.sin(t * 2.2))
      glowMat.opacity    = 0.03 + 0.025 * Math.sin(t * 0.75)

      // ── Body mesh pulse
      bodyMat.opacity = 0.60 + 0.20 * Math.abs(Math.sin(t * 1.6))
      wireMat.opacity = 0.36 + 0.22 * Math.abs(Math.sin(t * 1.1))

      // ── Segment stripe sequential flash (data flowing down abdomen)
      const stripeT = (t * 2.2) % STRIPE_YS.length
      stripeMats.forEach((mat, i) => {
        const dist = Math.abs(i - stripeT)
        const wrap = Math.min(dist, STRIPE_YS.length - dist)
        mat.opacity = 0.30 + 0.70 * Math.exp(-wrap * 1.9)
      })

      // ── Body light pulses — travel from thorax to stinger
      for (let i = 0; i < PULSE_N; i++) {
        const ph = ((t * 1.7 + i / PULSE_N) % 1)
        const py = 0.52 - ph * 1.68
        const r  = Math.max(0.01, 0.44 * Math.sin(Math.max(0, (py + 1.14) / 1.66) * Math.PI))
        const angle = t * 4.5 + i * 0.785
        pulsePos[i*3]   = Math.cos(angle) * r * 0.55
        pulsePos[i*3+1] = py
        pulsePos[i*3+2] = Math.sin(angle) * r * 0.55
      }
      pulseAttr.needsUpdate = true
      pulseMat.opacity = 0.60 + 0.40 * Math.abs(Math.sin(t * 4.0))

      // ── Energy orbs orbit
      for (let i = 0; i < ORB_N; i++) {
        const angle  = orbPhase[i] + t * orbSpd[i]
        const radius = orbRad[i] + 0.3 * Math.sin(t * 1.5 + i)
        orbPos[i*3]   = Math.cos(angle) * radius
        orbPos[i*3+1] = orbY[i] + 0.28 * Math.sin(t * 0.9 + i * 1.5)
        orbPos[i*3+2] = Math.sin(angle) * radius * 0.35
      }
      orbAttr.needsUpdate = true
      orbMat.opacity = 0.48 + 0.42 * Math.abs(Math.sin(t * 1.4))

      // ── Body glow particles breathe
      for (let i = 0; i < BP; i++) {
        const d = 0.07 + 0.06 * Math.sin(t * 2.1 + bPhase[i])
        bPos[i*3]   = bBase[i*3]   * (1 + d)
        bPos[i*3+1] = bBase[i*3+1]
        bPos[i*3+2] = bBase[i*3+2] * (1 + d)
      }
      bAttr.needsUpdate = true

      // ── Ambient dust bounce
      for (let i = 0; i < DUST; i++) {
        dPos[i*3]   += dVel[i*3]
        dPos[i*3+1] += dVel[i*3+1]
        dPos[i*3+2] += dVel[i*3+2]
        if (Math.abs(dPos[i*3])   > BOUND) dVel[i*3]   *= -1
        if (Math.abs(dPos[i*3+1]) > BOUND) dVel[i*3+1] *= -1
        if (Math.abs(dPos[i*3+2]) > BOUND) dVel[i*3+2] *= -1
      }
      dAttr.needsUpdate = true

      // ── Atmospheric slow upward drift
      for (let i = 0; i < ATMO; i++) {
        atmoPos[i*3+1] += 0.00045
        if (atmoPos[i*3+1] > AYMAX) atmoPos[i*3+1] = AYMIN
      }
      atmoAttr.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!canvas) return
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      scaleToFit()
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      geos.forEach(g => g.dispose())
      mats.forEach(m => m.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', willChange: 'transform' }}
      />
      {/* Edge dissolve — keeps bee from hard-clipping at viewport edges */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '22%',
        background: 'linear-gradient(to bottom, #050505 0%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%',
        background: 'linear-gradient(to top, #050505 0%, transparent 100%)',
      }} />
    </div>
  )
}
