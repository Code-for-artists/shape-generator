import React, { useRef, useEffect } from 'react';

const DynamicCloudCanvas = () => {
  const canvasRef = useRef(null);
  const particlesArray = useRef([]);

  // Particle class to define individual particles
  class Particle {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.initialSize = size;
      this.size = size;
      this.alpha = 1;
      this.expansionRate = Math.random() * 0.05 + 0.01;
      this.lifetime = 0;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
      this.size += this.expansionRate;
      this.lifetime += 1;
      this.x += this.speedX;
      this.y += this.speedY;
      // Fade out over 30 seconds (assuming 60 frames per second)
      this.alpha = 1 - this.lifetime / (60 * 30);
      if (this.alpha < 0) this.alpha = 0;
    }

    draw(context) {
      const gradient = context.createRadialGradient(this.x, this.y, this.size * 0.3, this.x, this.y, this.size);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const generateCloud = (x, y) => {
      const numberOfParticles = Math.random() * 100 + 50;
      const cloudWidth = Math.random() * 150 + 50;
      const cloudHeight = Math.random() * 75 + 25;

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 10 + 10;
        const particleX = x + (Math.random() - 0.5) * cloudWidth;
        const particleY = y + (Math.random() - 0.5) * cloudHeight;
        particlesArray.current.push(new Particle(particleX, particleY, size));
      }
    };

    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      generateCloud(x, y);
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particlesArray.current.length - 1; i >= 0; i--) {
        const particle = particlesArray.current[i];
        particle.update();
        particle.draw(context);

        // Remove particles that are fully faded out
        if (particle.alpha <= 0) {
          particlesArray.current.splice(i, 1);
        }
      }
      requestAnimationFrame(animate);
    };

    canvas.addEventListener('click', handleCanvasClick);
    animate();

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, []);

  // Function to handle image download
  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'cloud_canvas.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
      <button onClick={downloadImage} style={{ marginTop: '10px' }}>Download Image</button>
    </div>
  );
};

export default DynamicCloudCanvas;