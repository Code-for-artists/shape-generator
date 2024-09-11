import React, { useRef, useState } from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";

import { Shape } from './components/Shape';
import { randomIntFromInterval } from "./utils/shapeGenerators";

import './App.css';
import { downloadSVGAsPNG } from './utils/downloadPng';

function App() {
  const [edges, setEdges] = useState(randomIntFromInterval(6, 20))
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const svgRef = useRef(null)
  const handleRandomEdges = () => {
    const newEdges = randomIntFromInterval(6, 20)
    setEdges(newEdges)
  }
  const handleDownload = () => downloadSVGAsPNG(svgRef.current)
  const size = isSmallDevice ? 350 : 600

  return (
    <div className="App">
      <div>
        <div className="button-container">
          <button class="edges-button" onClick={handleRandomEdges}>
            Actualizar bordes
          </button>
          <button class="download-button" onClick={handleDownload}>
            Descargar
          </button>
        </div>
        <Shape svgRef={svgRef} size={size} edges={edges} />
      </div>
    </div>
  );
}

export default App;
