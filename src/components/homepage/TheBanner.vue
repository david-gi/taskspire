<script
  setup
  lang='ts'
>
import { onBeforeUnmount, onMounted } from 'vue'
import * as THREE from 'three'
import { useMouse } from '../../composables/MovementTracking'

const mouse = useMouse()

let animationId: number

const initScene = () => {
  const scene = new THREE.Scene()
  const renderer = new THREE.WebGLRenderer()
  const coverage = 0.8

  renderer.setSize(window.innerWidth, window.innerHeight * coverage)
  document.getElementById('canv')?.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(120, window.innerWidth / (window.innerHeight * coverage), 0.1, 1000)
  camera.position.z = 5
  camera.position.y += 1

  const light = new THREE.PointLight(THREE.Color.NAMES.green, 600, 20)
  light.position.z = -2
  light.position.y += 2
  light.position.x -= 2
  scene.add(light)
  const light2 = new THREE.PointLight(THREE.Color.NAMES.green, 600, 20)
  light2.position.z = -2
  light2.position.y -= 2
  light2.position.x -= -2
  scene.add(light2)

  const resizeScreenRefresh = () => {
    renderer.setSize(window.innerWidth, window.innerHeight * coverage)
    camera.aspect = window.innerWidth / (window.innerHeight * coverage)
  }
  window.addEventListener('resize', resizeScreenRefresh)

  return { scene, camera, renderer }
}

const createTShape = () => {
  const tShape = new THREE.Shape()
  tShape.moveTo(0, 2)
  tShape.lineTo(2, 2)
  tShape.lineTo(2, 1.5)
  tShape.lineTo(1.25, 1.5)
  tShape.lineTo(1.25, 0)
  tShape.lineTo(0.75, 0)
  tShape.lineTo(0.75, 1.5)
  tShape.lineTo(0, 1.5)

  const extrudeSettings = {
    steps: 2,
    depth: 0.4,
    bevelEnabled: true,
  }
  const geometry = new THREE.ExtrudeGeometry(tShape, extrudeSettings)

  const material = new THREE.MeshPhongMaterial({
    emissive: THREE.Color.NAMES.blueviolet,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.8
  })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.y -= 1
  mesh.position.x -= 1
  mesh.position.z += 0.3

  return mesh
}

const createClock = () => {
  class SpiralCurve extends THREE.Curve<THREE.Vector3> {
    a: number
    b: number

    constructor(a: number, b: number) {
      super()
      this.a = a
      this.b = b
    }

    getPoint(t: number): THREE.Vector3 {
      const angle = 1 * Math.PI * t * this.b
      const x = this.a * angle * Math.cos(angle)
      const y = this.a * angle * Math.sin(angle)
      return new THREE.Vector3(x, y, 0)
    }
  }

  const baseMaterial = new THREE.MeshPhongMaterial({
    emissive: THREE.Color.NAMES.darkgreen,
    emissiveIntensity: 4,
  })
  const faceMaterial = new THREE.MeshPhongMaterial({
    emissive: THREE.Color.NAMES.indigo,
    emissiveIntensity: 0.1,
    transparent: true,
    opacity: 0.8
  })
  const spokesMaterial = new THREE.MeshPhongMaterial({
    emissive: THREE.Color.NAMES.indigo,
    emissiveIntensity: 2,
    wireframe: true,
    wireframeLinewidth: 0.1
  })

  const createRay = (width: number, length: number) => {
    const geometry = new THREE.PlaneGeometry(width, length)
    geometry.translate(0, -length / 2, 0)
    const mesh = new THREE.Mesh(geometry, baseMaterial)
    mesh.position.z -= 0.99

    return mesh
  }

  const c1 = createRay(0.14, 1.8)
  const c2 = createRay(0.1, 2.5)
  const c3 = createRay(0.05, 3)

  const ringGeometry = new THREE.RingGeometry(3.9, 4, 64)
  const faceGeometry = new THREE.RingGeometry(0, 4, 12)

  const ring = new THREE.Mesh(ringGeometry, baseMaterial)
  const face = new THREE.Mesh(faceGeometry, faceMaterial)
  const spokes = new THREE.Mesh(faceGeometry, spokesMaterial)
  ring.position.z -= 1
  face.position.z -= 1.02
  spokes.position.z -= 1.01

  const spiralCurve = new SpiralCurve(0.315, 4)
  const spiralGeometry = new THREE.TubeGeometry(spiralCurve, 100, 0.03, 64, false)
  const spiral = new THREE.Mesh(spiralGeometry, baseMaterial)
  spiral.position.z -= 1

  const clockGroup = new THREE.Group()
  clockGroup.add(c1)
  clockGroup.add(c2)
  clockGroup.add(c3)
  clockGroup.add(ring)
  clockGroup.add(face)
  clockGroup.add(spokes)
  clockGroup.add(spiral)

  const factor = 0.75
  clockGroup.scale.set(factor, factor, factor)

  return clockGroup
}

const createArrow = () => {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(1, -2)
  shape.lineTo(2, 0)
  shape.lineTo(0, 0)

  const extrudeSettings = {
    steps: 2,
    depth: 0.2,
    bevelEnabled: !true,
  }
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  const material = new THREE.MeshPhongMaterial({
    emissive: THREE.Color.NAMES.blueviolet,
    emissiveIntensity: 1,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.scale.set(0.4, 0.25, 0.25)

  mesh.position.x = -0.45
  mesh.position.y = -6
  mesh.position.z = -1

  return mesh
}

const createParticles = () => {
  const particles: THREE.Mesh[] = []
  const particleCount = 200
  const material = new THREE.MeshPhongMaterial({
    color: THREE.Color.NAMES.indigo,
    specular: THREE.Color.NAMES.whitesmoke,
    shininess: 1,
    emissive: THREE.Color.NAMES.indigo,
    emissiveIntensity: 0.2
  })

  const randCoordinate = (min: number, max: number) => Math.random() * (max - min) + min

  for (let i = 0; i < particleCount; i++) {
    const geometry = new THREE.PlaneGeometry(0.1, 0.1)
    const particle = new THREE.Mesh(geometry, material)
    particle.position.set(randCoordinate(-10, 10), randCoordinate(-10, 10), randCoordinate(-40, -1))
    particles.push(particle)
  }

  return particles
}

const createSceneAnimation = (scene: THREE.Scene) => {
  const icon = createTShape()
  const clock = createClock()
  const arrow = createArrow()
  const particles = createParticles()

  scene.add(icon)
  scene.add(clock)
  scene.add(arrow)
  particles.forEach(x => scene.add(x))

  const animateClock = () => {
    clock.children.slice(0, 3).forEach((ray, i) => {
      const speed = (i * 0.1) + 0.03
      ray.rotation.z -= speed
    })
  }

  let arrowdirection = 1
  const animateArrow = () => {
    const speed = 0.004
    if (arrow.position.y > -6 && arrowdirection > 0) arrowdirection = -1
    if (arrow.position.y < -6.15 && arrowdirection < 0) arrowdirection = 1
    arrow.position.y += speed * arrowdirection
  }

  const animateParticles = () => {
    particles.forEach(particle => {
      particle.position.y += 0.006
      particle.position.z += 0.02
      if (particle.position.z > 10) particle.visible = false
    })
  }

  return () => {
    animateClock()
    animateArrow()
    animateParticles()
  }
}

const rotateCamera = (camera: THREE.Camera) => {
  const targetPosition = new THREE.Vector3(0, 0, -10)
  const sensitivity = 3
  const lerpFactor = 0.05
  camera.position.x += (-mouse.x.value * sensitivity - camera.position.x) * lerpFactor
  camera.position.y += (-mouse.y.value * sensitivity + 3 - camera.position.y - 2) * lerpFactor
  camera.lookAt(targetPosition)
}

onMounted(() => {
  const { scene, camera, renderer } = initScene()
  const sceneAnimations = createSceneAnimation(scene)

  const animate = () => {
    requestAnimationFrame(animate)

    rotateCamera(camera)
    sceneAnimations()

    renderer.render(scene, camera)
  }

  animationId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <div id='canv'></div>
</template>../../composables/MovementTracking
