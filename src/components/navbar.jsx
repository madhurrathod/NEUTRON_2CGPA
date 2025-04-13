import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ThemeSwitch.css';
import './NavbarAnimations.css';
import './ModernButton.css';
import FuzzyText from './FuzzyText';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [hoverIntensity] = useState(0.5);
  const [enableHover] = useState(true);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 w-full px-4">
        <nav className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg px-12 py-2 flex items-center justify-between transition-all duration-300 rounded-full mx-auto max-w-[1200px] navbar-glowing">
          <div className="text-lg font-semibold text-white">
            <FuzzyText 
              baseIntensity={0.2} 
              hoverIntensity={hoverIntensity} 
              enableHover={enableHover}
              fontSize="2rem"
            >
              2CGPA
            </FuzzyText>
          </div>
          <div className="flex items-center space-x-6">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span className="slider">
                <div className="star star_1"></div>
                <div className="star star_2"></div>
                <div className="star star_3"></div>
                <svg viewBox="0 0 16 16" className="cloud_1 cloud">
                  <path
                    transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                    fill="#fff"
                    d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                  ></path>
                </svg>
              </span>
            </label>
            
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-white hover:text-white/80 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white hover:text-white/80 transition-colors">About Us</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
