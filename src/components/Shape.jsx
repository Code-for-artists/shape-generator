import React, { useCallback, useEffect, useState } from "react";
import { randomIntFromInterval, generateRandomBlobPath, generateBlobPath } from "../utils/shapeGenerators";

const COLORS = [
  '#598392',
  '#aec3b0',
  '#b8c0ff',
  '#eee2df',
  '#9a8c98',
  '#cbdfbd'
]
export const Shape = (props) => {
  const [path, setPath] = useState('')
  const reDrawShapes = useCallback(() => {
    const edges = randomIntFromInterval(6, 20);
    setPath(generateRandomBlobPath(edges, props.size, props.size, 100))
    setPath(generateBlobPath(edges, props.size, props.size))
  }, [setPath, props.size])

  useEffect(() => {
    reDrawShapes()
  }, [reDrawShapes])

  const colorIndex = Math.floor(Math.random() * COLORS.length)
  const fill = COLORS[colorIndex]
  return (
    <div className="shape-card" onClick={reDrawShapes}>
      <svg width={props.size} height={props.size} fill={fill}>
        <path d={path} />
      </svg>
    </div>
  )
}
