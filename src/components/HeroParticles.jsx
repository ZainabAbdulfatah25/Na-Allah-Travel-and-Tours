import React, { useEffect, useState } from 'react';

function HeroParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          id: i,
          size: Math.random() * 4 + 1,
          left: Math.random() * 100,
          animationDuration: Math.random() * 15 + 10,
          animationDelay: Math.random() * 10,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <div style={styles.container}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            ...styles.particle,
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            opacity: p.opacity,
            animationDuration: `${p.animationDuration}s`,
            animationDelay: `-${p.animationDelay}s`
          }}
        />
      ))}
      <style>
        {`
          .particle {
            position: absolute;
            bottom: -10px;
            background-color: var(--primary-gold);
            border-radius: 50%;
            pointer-events: none;
            animation: floatUp linear infinite;
            box-shadow: 0 0 8px var(--primary-gold);
          }
          @keyframes floatUp {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
    pointerEvents: 'none'
  },
  particle: {}
};

export default HeroParticles;
