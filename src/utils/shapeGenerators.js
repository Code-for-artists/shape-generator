export function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateRandomBlobPath(edges, width, height, smoothing) {
  if (edges < 3) {
    throw new Error("Number of edges should be at least 3.");
  }

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;
  const points = [];
  const angleStep = (2 * Math.PI) / edges;
  const smoothingFactor = smoothing / 100;

  for (let i = 0; i < edges; i++) {
    const angle = i * angleStep;
    const randomRadius = radius * (0.8 + Math.random() * 0.4); // Random radius between 0.8R and 1.2R
    const x = centerX + randomRadius * Math.cos(angle);
    const y = centerY + randomRadius * Math.sin(angle);
    points.push({ x, y });
  }

  let path = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length; i++) {
    const nextPoint = points[(i + 1) % points.length];
    const controlPointX = points[i].x + smoothingFactor * (nextPoint.x - points[i].x);
    const controlPointY = points[i].y + smoothingFactor * (nextPoint.y - points[i].y);
    path += ` Q${controlPointX},${controlPointY},${nextPoint.x},${nextPoint.y}`;
  }
  path += " Z"; // Close the path

  return path;
}

export function generateBlobPath(edges, width, height) {
  if (edges < 4) {
    throw new Error("Minimum number of edges is 4");
  }

  const rightAngleCount = Math.min(Math.floor(Math.random() * (Math.min(4, edges - 2) + 1)), edges - 4);
  const angleStep = (2 * Math.PI) / edges;
  const points = [];

  for (let i = 0; i < edges; i++) {
    const angle = i * angleStep;
    const randomRadius = 0.2 + Math.random() * 0.8; // Random radius between 0.4 to 1.0 of the canvas size
    const radius = (Math.min(width, height) / 2) * randomRadius;
    let x = width / 2 + radius * Math.cos(angle);
    let y = height / 2 + radius * Math.sin(angle);

    if (rightAngleCount > 0 && Math.random() < rightAngleCount / edges) {
      // Apply right angle offset
      const rightAngleOffset = Math.random() < 0.5 ? -radius : radius;
      if (Math.random() < 0.5) {
        x = width / 2 + rightAngleOffset;
      } else {
        y = height / 2 + rightAngleOffset;
      }
    }

    points.push({ x, y, angle });
  }

  // Sort points by angle to avoid transversal lines
  points.sort((a, b) => a.angle - b.angle);

  // Construct SVG path with Bezier curves
  let path = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length; i++) {
    const nextPoint = points[(i + 1) % points.length];
    const controlPoint1 = {
      x: (points[i].x + nextPoint.x) / 2,
      y: points[i].y
    };
    const controlPoint2 = {
      x: nextPoint.x,
      y: (points[i].y + nextPoint.y) / 2
    };
    path += ` C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${nextPoint.x},${nextPoint.y}`;
  }
  path += " Z";

  return path;
}

