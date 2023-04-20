export function generateRandomShape(size = 400) {
  const canvasWidth = size;
  const canvasHeight = size;
  const minShapeSize = 200;
  const minPoints = 3;
  const maxPoints = 10;
  const angles = [];
  const points = [];
  const numPoints = Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints;
  const numAngles = Math.floor(Math.random() * (numPoints * 2)) + 1;

  for (let i = 0; i < numAngles; i++) {
    angles.push(Math.floor(Math.random() * 360));
  }

  for (let i = 0; i < numPoints; i++) {
    const lastPoint = points[i - 1] || {x: 0, y: 0};
    const x = Math.abs(Math.floor(Math.random() * canvasWidth - lastPoint.x/4));
    const y = Math.abs(Math.floor(Math.random() * canvasHeight - lastPoint.y/4));
    points.push({ x, y });
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < numPoints - 1; i++) {
    const angle1 = angles[i * 2 - 2] || 0;
    const angle2 = angles[i * 2 - 1] || 0;
    const x1 = Math.abs(Math.floor(points[i - 1].x + Math.cos(angle1) * minShapeSize));
    const y1 = Math.abs(Math.floor(points[i - 1].y + Math.sin(angle1) * minShapeSize));
    const x2 = Math.abs(Math.floor(points[i].x + Math.cos(angle2) * minShapeSize));
    const y2 = Math.abs(Math.floor(points[i].y + Math.sin(angle2) * minShapeSize));
    const point = points[i];
    if (angle1 || angle2) {
      path += ` ${!points[i - 1].haveArc ? 'C' : 'C'} `
      path += `${x1} ${y1}, ${x2} ${y2}, ${points[i].x} ${points[i].y}`;
    } else {
      path += ` L ${point.x} ${point.y}`
    }
  }

  const firstPosition = points[0]
  path += ` L ${firstPosition.x} ${firstPosition.y} Z`
  console.log(path)
  return {
    path,
    numPoints,
    numAngles,
    angles,
    points
  };
}
