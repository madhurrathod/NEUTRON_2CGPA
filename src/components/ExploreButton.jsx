import React from 'react';

const ExploreButton = () => {
  const scrollToMain = () => {
    const mainSection = document.querySelector('main');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        onClick={scrollToMain}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          backgroundColor: 'rgba(0, 229, 255, 0.1)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
          borderRadius: '25px',
          color: '#fff',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontSize: '1rem',
          fontWeight: '500'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Explore More
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M7 13l5 5 5-5"/>
          <path d="M7 6l5 5 5-5"/>
        </svg>
      </button>
    </div>
  );
};

export default ExploreButton; 