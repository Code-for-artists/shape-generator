export function generateRandomShape(size = 400) {
  const numPoints = Math.floor(Math.random() * 8) + 3;
  const numCircles = Math.floor(Math.random() * (numPoints * 2)) + 1;
  const angles = [];
  const positions = [];
  let path = ''

  for (let i = 0; i < numCircles; i++) {
    angles.push(Math.floor(Math.random() * 360));
  }

  for (let i = 0; i < numPoints; i++) {
    const angle = angles.pop()
    const have2Arc = Math.random() < 0.5;
    const angle2 = have2Arc && angles.pop() || 0
    const haveArc = Math.random() < 0.5 && angle;
    const prevPosition = positions[i - 1] || {}
    const x = Math.floor(Math.random() * size)
    const y = Math.floor(Math.random() * size)
    const x2 = Math.abs(Math.floor(x * Math.cos(angle2) - y * Math.sin(angle2)))
    const y2 = Math.abs(Math.floor(x * Math.sin(angle2) + y * Math.cos(angle2)))
    positions.push({
      x,
      y,
      curve2: {
        x: x2,
        y: y2
      },
      curve1: {
        x: Math.abs(Math.floor(x2 * Math.cos(angle) - y2 * Math.sin(angle))),
        y: Math.abs(Math.floor(x2 * Math.sin(angle) + y2 * Math.cos(angle)))
      },
      haveArc
    });
    const position = positions[i]
    if (i === 0) {
      path += `M ${position.x} ${position.y}`
    } else if (position.haveArc) {
      path += ` ${!positions[i - 1].haveArc ? 'S' : 'C'} `
      path += `${position.curve1.x} ${position.curve1.y} `
      path += `${position.curve2.x} ${position.curve2.y} `
      path += `${position.x} ${position.y}`
    } else {
      path += ` L ${position.x} ${position.y}`
    }
  }
  const firstPosition = positions[0]
  path += ` L ${firstPosition.x} ${firstPosition.y} Z`
  return {
    path,
    numPoints,
    numCircles,
    angles,
    positions
  };
}
