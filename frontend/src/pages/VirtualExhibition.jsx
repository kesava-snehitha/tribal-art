import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VirtualExhibition.css';

const exhibitionData = [
  {
    id: 1,
    title: "The Spirit of Warli",
    culture: "Warli Tribe, Maharashtra",
    description: "Discover the ancient tradition of Warli painting. Rooted in ritual and everyday life, these geometric figures tell stories of harvest, festivals, and the deep connection between the Warli people and nature.",
    image: "/src/assets/tribal-painting.png",
    accentColor: "#8b4513"
  },
  {
    id: 2,
    title: "Mastery of Earth",
    culture: "Khavda, Gujarat",
    description: "Experience the organic beauty of Khavda pottery. Artisans use mud from the Rann of Kutch to craft these vessels, painting them with earth colors to reflect the vibrant landscape.",
    image: "/src/assets/ceramic-plate.png",
    accentColor: "#c25e2e"
  },
  {
    id: 3,
    title: "The Wooden Echoes",
    culture: "Bastar, Chhattisgarh",
    description: "Delve into the intricate wooden sculptures of Bastar. These pieces are not just art; they are the physical manifestation of tribal deities and ancestral spirits, carved from ancient timber.",
    image: "/src/assets/wooden-sculpture.png",
    accentColor: "#5c4033"
  }
];

function VirtualExhibition() {
  const [activeCanvas, setActiveCanvas] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPosition / windowHeight);
      
      if (index >= 0 && index < exhibitionData.length) {
        setActiveCanvas(index);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="virtual-exhibition">
      <div className="ve-header">
        <h1>Virtual Exhibitions</h1>
        <p>A Journey Through Tribal Heritage</p>
        <div className="scroll-indicator">
          <span>Scroll to Explore</span>
          <div className="mouseIcon"></div>
        </div>
      </div>

      <div className="ve-container">
        {exhibitionData.map((exhibit, index) => (
          <div 
            key={exhibit.id} 
            className={`ve-section ${index === activeCanvas ? 'active' : ''}`}
            style={{ 
              backgroundColor: index === activeCanvas ? '#0a0a0a' : '#111', 
              color: '#fff' 
            }}
          >
            <div className="ve-content-grid">
              <div className="ve-text-content">
                <span className="ve-culture" style={{ color: exhibit.accentColor }}>{exhibit.culture}</span>
                <h2>{exhibit.title}</h2>
                <div className="ve-divider" style={{ backgroundColor: exhibit.accentColor }}></div>
                <p>{exhibit.description}</p>
                <Link to="/products" className="ve-explore-btn" style={{ borderColor: exhibit.accentColor, color: exhibit.accentColor }}>
                  Explore Collection
                </Link>
              </div>
              <div className="ve-visual-content">
                <div className="ve-image-container">
                  <img src={exhibit.image} alt={exhibit.title} className="ve-artwork" />
                  <div className="ve-glow" style={{ background: `radial-gradient(circle, ${exhibit.accentColor} 0%, transparent 70%)` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="ve-progress-dots">
        {exhibitionData.map((_, index) => (
          <div 
            key={index} 
            className={`ve-dot ${index === activeCanvas ? 'active' : ''}`}
            onClick={() => window.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' })}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default VirtualExhibition;
