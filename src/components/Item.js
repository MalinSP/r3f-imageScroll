import React, { useRef, useState } from "react"
import { Image, useScroll } from "@react-three/drei"
import { useFrame } from "react-three-fiber"
import * as THREE from "three"
import data from "../data"

import { proxy, useSnapshot } from "valtio"
const state = proxy({
  clicked: null,
  urls: data.map((_, index) => {
    return `${index}.jpg`
  }),
})

const damp = THREE.MathUtils.damp

const Item = ({
  url,
  id,
  position,
  scale,
  data,
  index,

  ...props
}) => {
  const [hover, setHover] = useState(false)
  const ref = useRef()
  let colored = new THREE.Color()
  const scroll = useScroll()
  const { clicked, urls } = useSnapshot(state)
  const click = () => {
    state.clicked = index === clicked ? null : index
  }

  const onMouseHover = () => {
    setHover(true)
  }
  const onMouseOut = () => {
    setHover(false)
  }

  useFrame((state, delta) => {
    //console.log(states)
    const y = scroll.curve(
      index / data.length - 1.5 / data.length,
      4 / data.length
    ) //0.92, 0.38,0

    ref.current.material.scale[1] = ref.current.scale.y = damp(
      ref.current.scale.y,
      clicked === index ? 5 : 4 + y,
      10,
      delta
    )
    ref.current.material.scale[0] = ref.current.scale.x = damp(
      ref.current.scale.x,
      clicked === index ? 4.7 : scale[0],
      6,
      delta
    )
    ref.current.material.grayscale = damp(
      ref.current.material.grayscale,
      hover || clicked === index ? 0 : Math.max(0, 1 - y),
      6,
      delta
    )
    ref.current.material.color.lerp(
      colored.set(hover || clicked === index ? "white" : "#aaa"),
      hover ? 0.3 : 0.1
    )

    if (clicked !== null && index < clicked) {
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] - 2,
        6,
        delta
      )
    }
    if (clicked !== null && index > clicked) {
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] + 2,
        6,
        delta
      )
    }
    if (clicked === null || clicked === index) {
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0],
        6,
        delta
      )
    }
  })

  return (
    <Image
      ref={ref}
      key={id}
      url={url}
      position={position}
      scale={scale}
      onClick={click}
      {...props}
      onPointerOver={onMouseHover}
      onPointerOut={onMouseOut}
    />
  )
}

export default Item
