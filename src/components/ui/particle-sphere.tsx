"use client"

import { Suspense, useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTexture, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

interface ParticleSphereProps {
  images: string[]
}

const PARTICLE_COUNT = 1200
const PARTICLE_SIZE_MIN = 0.005
const PARTICLE_SIZE_MAX = 0.01
const SPHERE_RADIUS = 9
const POSITION_RANDOMNESS = 4
const ROTATION_SPEED_Y = 0.0006
const IMAGE_SIZE = 1.5

function Scene({ images }: ParticleSphereProps) {
  const groupRef = useRef<THREE.Group>(null)
  const textures = useTexture(images)

  const particles = useMemo(
    () => {
      const list: { position: [number, number, number]; scale: number; color: THREE.Color }[] = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
        const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi
        // eslint-disable-next-line react-hooks/purity -- one-time star-field seed computed once via useMemo([]), not re-randomized per render
        const radiusVariation = SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS

        const x = radiusVariation * Math.cos(theta) * Math.sin(phi)
        const y = radiusVariation * Math.cos(phi)
        const z = radiusVariation * Math.sin(theta) * Math.sin(phi)

        list.push({
          position: [x, y, z],
          // eslint-disable-next-line react-hooks/purity -- see above
          scale: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
          // Blue-violet tint matching --primary, instead of the reference's yellow-orange
          // eslint-disable-next-line react-hooks/purity -- see above
          color: new THREE.Color().setHSL(0.63, 0.75, 0.6 + Math.random() * 0.25),
        })
      }
      return list
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally computed once
    []
  )

  const orbitingImages = useMemo(() => {
    const count = images.length
    const list: { position: [number, number, number]; rotation: [number, number, number]; textureIndex: number }[] = []

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const x = SPHERE_RADIUS * Math.cos(angle)
      const y = 0
      const z = SPHERE_RADIUS * Math.sin(angle)

      const position = new THREE.Vector3(x, y, z)
      const outward = position.clone().normalize()
      const euler = new THREE.Euler()
      const matrix = new THREE.Matrix4()
      matrix.lookAt(position, position.clone().add(outward), new THREE.Vector3(0, 1, 0))
      euler.setFromRotationMatrix(matrix)

      list.push({
        position: [x, y, z],
        rotation: [euler.x, euler.y, euler.z],
        textureIndex: i % textures.length,
      })
    }
    return list
  }, [images.length, textures.length])

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += ROTATION_SPEED_Y
  })

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position} scale={p.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.9} />
        </mesh>
      ))}

      {orbitingImages.map((img, i) => {
        const texture = textures[img.textureIndex]
        if (!texture) return null
        return (
          <mesh key={i} position={img.position} rotation={img.rotation}>
            <planeGeometry args={[IMAGE_SIZE, IMAGE_SIZE]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
          </mesh>
        )
      })}
    </group>
  )
}

export function ParticleSphere({ images }: ParticleSphereProps) {
  return (
    <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Scene images={images} />
      </Suspense>
      {/* Zoom disabled — mouse-wheel zoom would fight the page's own scroll */}
      <OrbitControls enablePan={false} enableZoom={false} enableRotate />
    </Canvas>
  )
}
