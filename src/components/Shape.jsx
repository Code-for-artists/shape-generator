import React from "react";
import { generateRandomShape } from "./utils";

export const Shape = (props) => {

  const shape = generateRandomShape(props.size)
  return (
    <svg width={props.size} height={props.size} fill="red">
      <path d={shape.path} />
    </svg>
  )
}
