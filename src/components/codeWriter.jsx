import React, { useState } from 'react';
import { generatePrompts } from '../api/gemini';

const CodeWriter = () => {
  const [prompt, setPrompt] = useState('');
  const [geminiOutput, setGeminiOutput] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleGeminiTest = async () => {
    if (!prompt.trim()) return;

    setIsTyping(true);
    setGeminiOutput('Generating...');
    setDisplayedOutput('');

    try {
      const response = await generatePrompts(prompt);
      setGeminiOutput(response);
      
      // Simulate typing effect
      let currentText = '';
      for (let i = 0; i < response.length; i++) {
        currentText += response[i];
        setDisplayedOutput(currentText);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    } catch (error) {
      setGeminiOutput(`Error: ${error.message}`);
      setDisplayedOutput(`Error: ${error.message}`);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            AI Code Writer
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Get AI assistance for your programming needs. Describe what you want to code, and our AI will help you write it.
            </p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the code you want to generate..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600"
            />
            <button
              onClick={handleGeminiTest}
              disabled={isTyping}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTyping ? "Generating Code..." : "Generate Code"}
            </button>
            {(displayedOutput || geminiOutput === "Generating...") && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white text-center">Generated Code:</h3>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-mono">
                    {displayedOutput}
                    {isTyping && (
                      <span className="inline-block w-2 h-5 ml-1 bg-blue-500 dark:bg-yellow-400 animate-pulse"/>
                    )}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeWriter; 