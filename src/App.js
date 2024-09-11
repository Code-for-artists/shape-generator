import { useState } from 'react';
import './App.css';
import { Shape } from './components/Shape';
import { randomIntFromInterval } from "./utils/shapeGenerators";

function App() {
  const [edges, setEdges] = useState(randomIntFromInterval(6, 20))
  const handleRandomEdges = () => {
    const newEdges = randomIntFromInterval(6, 20)
    setEdges(newEdges)
  }
  return (
    <div className="App">
      <div>
        <button class="edges-button" onClick={handleRandomEdges}>
          change edges
        </button>
        <Shape size={600} edges={edges} />
      </div>
    </div>
  );
}

export default App;
