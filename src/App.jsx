import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./components/Home.jsx";
import "./App.css";
import Aurora from "./components/Aurora.jsx";
import TextPressure from './components/TextPressure';
import SpotlightCard from './components/SpotlightCard';
import ExploreButton from './components/ExploreButton';
import AboutUs from './components/AboutUs.jsx';
import ImageGenerator from './components/imageGenerator.jsx';
import GeminiPrompt from './components/geminiPrompt.jsx';
import CodeWriter from './components/codeWriter.jsx';

const MainContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div>
      <Aurora colorStops={["#7C3AED", "#4F46E5", "#0891B2"]} blend={0.5} amplitude={1.0} speed={0.5} />
      <Navbar />
      {isHomePage && (
        <>
          <div style={{ marginTop: '120px' }}>
            <TextPressure text="2CGPA" flex={true} alpha={false} stroke={false} width={true} weight={true} italic={true} textColor="#ffffff" strokeColor="#ff0000" minFontSize={36} />
          </div>
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <p style={{ color: '#fff', fontSize: '1.25rem', lineHeight: '1.75', textAlign: 'center', margin: '0 0 2rem 0' }}>Artificial Intelligence is the mirror of human ingenuity, reflecting our boundless potential to create, innovate, and transcend the limits of imagination. What we build today shapes the possibilities of tomorrow</p>
            <ExploreButton />
          </SpotlightCard>
        </>
      )}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/image-generator" element={<ImageGenerator />} />
          <Route path="/chatbot" element={<GeminiPrompt />} />
          <Route path="/code-writer" element={<CodeWriter />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return <Router><MainContent /></Router>;
}

export default App;