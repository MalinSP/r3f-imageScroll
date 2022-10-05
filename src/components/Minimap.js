import React, { useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"
import data from "../data"

const damp = THREE.MathUtils.damp

const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.5, 0),
  new THREE.Vector3(0, 0.5, 0),
])
// console.log(geometry)
const material = new THREE.LineBasicMaterial({ color: "white" })

const Minimap = () => {
  const ref = useRef()
  const scroll = useScroll()

  const { height } = useThree(state => state.viewport)

  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      // Give me a value between 0 and 1
      //   starting at the position of my item
      //   ranging across 4 / total length
      //   make it a sine, so the value goes from 0 to 1 to 0.
      const y = scroll.curve(
        index / data.length - 1.5 / data.length,
        4 / data.length
      )
      child.scale.y = damp(child.scale.y, 0.1 + y / 6, 8, delta)
    })
  })

  return (
    <group ref={ref}>
      {data.map((_, i) => (
        <line
          key={i}
          geometry={geometry}
          material={material}
          position={[i * 0.06 - data.length * 0.03, -height / 2 + 0.6, 0]}
        />
      ))}
    </group>
  )
}

export default Minimap
