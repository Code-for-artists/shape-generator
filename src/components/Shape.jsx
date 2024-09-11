import React, { useCallback, useEffect, useState } from "react";
import { generateRandomBlobPath, generateBlobPath } from "../utils/shapeGenerators";

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
    setPath(generateRandomBlobPath(props.edges, props.size, props.size, 100))
    setPath(generateBlobPath(props.edges, props.size, props.size))
  }, [setPath, props.size, props.edges ])

  useEffect(() => {
    reDrawShapes()
  }, [reDrawShapes, props.edges])

  const colorIndex = Math.floor(Math.random() * COLORS.length)
  const fill = COLORS[colorIndex]
  return (
    <div className="shape-card" onClick={reDrawShapes}>
      <svg ref={props.svgRef} width={props.size} height={props.size} fill={fill}>
        <path d={path} />
      </svg>
    </div>
  )
}
