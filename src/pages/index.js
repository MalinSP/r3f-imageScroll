import React from "react"
import "../css/reset.css"
import "../css/main.css"
import { Canvas } from "@react-three/fiber"
import Items from "../components/Items"

export default function Home() {
  return (
    <Canvas className="canvas-container">
      <Items />
    </Canvas>
  )
}
