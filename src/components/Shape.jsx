import React from "react";
import { generateRandomShape } from "./utils";

export const Shape = (props) => {

  const shapes = Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(() =>
    generateRandomShape(props.size)
  )
  return (
    <div className="shape-card">
      <svg width={props.size} height={props.size} fill="red">
        {
          shapes.map(shape => (
            <path key={shape.path} d={shape.path} />
          ))
        }
      </svg>
    </div>
  )
}
