import React, { useCallback, useEffect, useState } from "react";
import { generateRandomShape, shapeTypes } from "./utils";

const COLORS = [
  '#598392',
  '#aec3b0',
  '#b8c0ff',
  '#eee2df',
  '#9a8c98',
  '#cbdfbd'
]
export const Shape = (props) => {

  const [shapes, setShapes] = useState([])
  let nonGeometrical = false
  const reDrawShapes = useCallback(() => {
    setShapes(Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(() => {
      const res = generateRandomShape(props.size, nonGeometrical)
      if (!res.path) nonGeometrical = true
      return res
    }
    ))
  }, [setShapes, props.size])
  useEffect(() => {
    reDrawShapes()
  }, [])

  const colorIndex = Math.floor(Math.random() * COLORS.length)
  const fill = COLORS[colorIndex]
  return (
    <div className="shape-card" onClick={reDrawShapes}>
      <svg width={props.size} height={props.size} fill={fill}>
        {
          shapes.map((shape, index) => (
            <>
              {shape.type === shapeTypes.PATH && <path key={shape.path} d={shape.path} />}
              {shape.type === shapeTypes.CIRCLE && <circle key={index} cx={shape.x} cy={shape.y} r={shape.radio} />}
              {shape.type === shapeTypes.SQUARE && <rect key={index} x={shape.x} y={shape.y} width={shape.radio} height={shape.radio} />}
              {shape.type === shapeTypes.RECTANGLE && <rect key={index} x={shape.x} y={shape.y} width={shape.radio} height={shape.radioY} />}
              {shape.type === shapeTypes.TRIANGLE && <polygon key={index} points={shape.points} />}
              {shape.type === shapeTypes.ELIPSE && <ellipse cx={shape.x} cy={shape.y} rx={shape.radio} ry={shape.ry} />}
            </>
          ))
        }
      </svg>
    </div>
  )
}
