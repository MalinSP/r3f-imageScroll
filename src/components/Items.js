import { Scroll, ScrollControls } from "@react-three/drei"
import React from "react"
import { useThree } from "react-three-fiber"
import data from "../data.js"
import Item from "./Item.js"
import Minimap from "../components/Minimap"

const Items = ({ w = 0.7, gap = 0.15 }) => {
  const { width } = useThree(state => state.viewport)
  const xW = w + gap
  return (
    <ScrollControls
      horizontal
      damping={10}
      pages={(width - xW + data.length * xW) / width}
    >
      <Minimap />
      <Scroll>
        {data.map((image, index) => {
          return (
            <Item
              key={index}
              index={index}
              {...image}
              position={[index * xW, 0, 0]}
              scale={[w, 4, 1]}
              data={data}
            />
          )
        })}
      </Scroll>
    </ScrollControls>
  )
}

export default Items
