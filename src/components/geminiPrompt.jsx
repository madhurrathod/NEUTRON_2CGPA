// src/components/LinkInput.jsx
import React, { useState, useEffect } from "react";
import { generatePrompts } from "../api/gemini.jsx";

const GeminiPrompt = () => {
  const [geminiOutput, setGeminiOutput] = useState("");
  const [displayedOutput, setDisplayedOutput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [highlightColor, setHighlightColor] = useState("#FFEB3B");

  const isLightColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128;
  };

  useEffect(() => {
    if (geminiOutput && geminiOutput !== "Generating...") {
      setIsTyping(true);
      setDisplayedOutput("");
      
      const lines = geminiOutput.split('\n');
      let currentLineIndex = 0;
      let currentCharIndex = 0;
      let currentText = '';

      const typewriterEffect = setInterval(() => {
        if (currentLineIndex < lines.length) {
          const currentLine = lines[currentLineIndex];
          
          if (currentCharIndex < currentLine.length) {
            currentText += currentLine[currentCharIndex];
            setDisplayedOutput(currentText);
            currentCharIndex++;
          } else {
            currentText += '\n';
            setDisplayedOutput(currentText);
            currentLineIndex++;
            currentCharIndex = 0;
          }
        } else {
          setIsTyping(false);
          clearInterval(typewriterEffect);
        }
      }, 10);

      return () => clearInterval(typewriterEffect);
    }
  }, [geminiOutput]);

  const handleGeminiTest = async () => {
    if (!prompt.trim()) {
      setGeminiOutput("Please enter a prompt");
      return;
    }

    try {
      setGeminiOutput("Generating...");
      const response = await generatePrompts(prompt);
      setGeminiOutput(response);
    } catch (error) {
      setGeminiOutput("❌ Error: " + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">APNA CGPA</h2>
          <div className="relative">
            <div 
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 overflow-hidden cursor-pointer flex items-center justify-center hover:scale-105 transition-transform"
              style={{ background: highlightColor }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-5 h-5"
                style={{ color: isLightColor(highlightColor) ? '#000' : '#fff' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <input
              type="color"
              value={highlightColor}
              onChange={(e) => setHighlightColor(e.target.value)}
              className="absolute inset-0 opacity-0 w-10 h-10 cursor-pointer"
              title="Choose highlight color"
            />
          </div>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600"
        />
        <button
          onClick={handleGeminiTest}
          disabled={isTyping}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTyping ? "Typing..." : "Generate Response"}
        </button>
        {(displayedOutput || geminiOutput === "Generating...") && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white text-left">Response:</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg overflow-auto max-h-[80vh]">
              <div className="prose dark:prose-invert max-w-none space-y-2">
                {(geminiOutput === "Generating..." ? geminiOutput : displayedOutput).split('\n').map((line, index) => {
                  if (!line.trim()) return null;
                  
                  if (line.startsWith('* **')) {
                    return (
                      <div key={index} className="flex items-start space-x-2">
                        <span style={{ color: highlightColor }} className="mt-1">•</span>
                        <div>
                          <span style={{ color: highlightColor }} className="font-semibold">
                            {line.replace('* **', '').replace(':**', '')}:
                          </span>
                          <span className="text-gray-700 dark:text-white">
                            {line.split(':**')[1]}
                          </span>
                        </div>
                      </div>
                    );
                  } else if (line.startsWith('* ')) {
                    return (
                      <div key={index} className="flex items-start space-x-2">
                        <span style={{ color: highlightColor }} className="mt-1">•</span>
                        <span className="text-gray-700 dark:text-white">{line.replace('* ', '')}</span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="flex items-start space-x-2">
                        <span style={{ color: highlightColor }} className="mt-1">•</span>
                        <span className="leading-relaxed text-gray-700 dark:text-white">{line}</span>
                      </div>
                    );
                  }
                })}
                {isTyping && (
                  <span className="inline-block w-2 h-5 ml-1 bg-blue-500 dark:bg-yellow-400 animate-pulse"/>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiPrompt;
