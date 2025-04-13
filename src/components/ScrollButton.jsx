import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

const ScrollButton = () => {
  const scrollToCards = () => {
    const cardsSection = document.querySelector('main');
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <button
        onClick={scrollToCards}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '25px',
          color: 'white',
          cursor: 'pointer',
          marginTop: '50px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(5px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        }}
      >
        Scroll Down
        <FaArrowDown />
      </button>
    </div>
  );
};

export default ScrollButton; 