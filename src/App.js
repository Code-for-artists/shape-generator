import { useRef, useState } from 'react';

import { Shape } from './components/Shape';
import { randomIntFromInterval } from "./utils/shapeGenerators";

import './App.css';
import { downloadSVGAsPNG } from './utils/downloadPng';

function App() {
  const [edges, setEdges] = useState(randomIntFromInterval(6, 20))
  const svgRef = useRef(null)
  const handleRandomEdges = () => {
    const newEdges = randomIntFromInterval(6, 20)
    setEdges(newEdges)
  }
  const handleDownload = () => downloadSVGAsPNG(svgRef.current)

  return (
    <div className="App">
      <div>
        <div className="button-container">
          <button class="edges-button" onClick={handleRandomEdges}>
            change edges
          </button>
          <button class="download-button" onClick={handleDownload}>
            download image 
          </button>
        </div>
        <Shape svgRef={svgRef} size={600} edges={edges} />
      </div>
    </div>
  );
}

export default App;
