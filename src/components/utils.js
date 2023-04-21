export const shapeTypes = {
  CIRCLE: "circle",
  SQUARE: "square",
  ELIPSE: "elipse",
  PATH: "path",
}

const geometricalShape = ({ x, y, radio, radioY }) => {
  return [
    { type: shapeTypes.CIRCLE, x, y, radio, radioY },
    { type: shapeTypes.SQUARE, x, y, radio, radioY },
    { type: shapeTypes.ELIPSE, x, y, radio, radioY },
  ]
}

export function generateRandomShape(size = 400, nonGeometrical = false) {
  const canvasWidth = size;
  const canvasHeight = size;
  const minShapeSize = 200;
  const minPoints = 3;
  const maxPoints = 5;
  const angles = [];
  const points = [];
  const numPoints = Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints;
  const numAngles = Math.floor(Math.random() * (numPoints * 2)) + 1;

  const isGeometrical = Math.random() > 0.5

  if (isGeometrical && !nonGeometrical) {
    const geomtricalShapeTypes = Object.keys(shapeTypes);
    return {
      ...geometricalShape({
        x: Math.abs(Math.floor(Math.random() * canvasWidth / 2) - 40),
        y: Math.abs(Math.floor(Math.random() * canvasHeight / 2) - 40),
        radio: Math.abs(Math.floor(Math.random() * canvasWidth) - minShapeSize),
        radioY: Math.abs(Math.floor(Math.random() * canvasHeight) - minShapeSize),
      })[Math.floor(Math.random() * (geomtricalShapeTypes.length - 1))]
    }
  }

  for (let i = 0; i < numAngles; i++) {
    angles.push(Math.floor(Math.random() * 360));
  }

  for (let i = 0; i < numPoints; i++) {
    const lastPoint = points[i - 1] || { x: 0, y: 0 };
    const x = Math.abs(Math.floor(Math.random() * canvasWidth - lastPoint.x / 4) - 20);
    const y = Math.abs(Math.floor(Math.random() * canvasHeight - lastPoint.y / 4) - 20);
    points.push({ x, y });
  }

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < numPoints - 1; i++) {
    const point = points[i];
    const angle1 = angles[i * 2 - 2] || 0;
    const angle2 = angles[i * 2 - 1] || 0;
    const x1 = Math.abs(Math.floor(points[i - 1].x + Math.cos(angle1) * minShapeSize) + 20);
    const y1 = Math.abs(Math.floor(points[i - 1].y + Math.sin(angle1) * minShapeSize) + 20);
    const x2 = Math.abs(Math.floor(points[i].x + Math.cos(angle2) * minShapeSize));
    const y2 = Math.abs(Math.floor(points[i].y + Math.sin(angle2) * minShapeSize));

    if (angle1 || angle2) {
      path += ` ${!points[i - 1].haveArc ? 'C' : 'C'} `
      path += `${x1} ${y1}, ${x2} ${y2}, ${points[i].x} ${points[i].y}`;
    } else {
      path += ` L ${point.x} ${point.y}`
    }
  }

  const firstPosition = points[0]
  path += ` L ${firstPosition.x} ${firstPosition.y} Z`

  return {
    type: shapeTypes.PATH,
    path,
    numPoints,
    numAngles,
    angles,
    points
  };
}
