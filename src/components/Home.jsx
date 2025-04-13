import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen flex items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full justify-center items-stretch">
        <div className="w-full lg:w-1/3 min-h-[400px] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
          <div className="relative h-48">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="h-24 w-24 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">AI ChatBot</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Engage in intelligent conversations with our AI-powered chatbot powered by Gemini.
              </p>
            </div>
            <div className="mt-auto">
              <button
                onClick={() => navigate('/chatbot')}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 
                         hover:from-blue-700 hover:to-cyan-700 
                         text-white py-3 px-6 rounded-lg font-medium
                         transition-all duration-200 transform hover:scale-[1.02]
                         flex items-center justify-center gap-2"
              >
                Start Chat
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 min-h-[400px] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
          <div className="relative h-48">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="h-24 w-24 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">AI Image Generator</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Transform your ideas into stunning visuals using our advanced AI image generation tool.
              </p>
            </div>
            <div className="mt-auto">
              <button
                onClick={() => navigate('/image-generator')}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 
                         hover:from-purple-700 hover:to-indigo-700 
                         text-white py-3 px-6 rounded-lg font-medium
                         transition-all duration-200 transform hover:scale-[1.02]
                         flex items-center justify-center gap-2"
              >
                Try Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 min-h-[400px] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
          <div className="relative h-48">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="h-24 w-24 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Code Writer</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Generate code snippets and get programming assistance with our AI-powered code writer.
              </p>
            </div>
            <div className="mt-auto">
              <button
                onClick={() => navigate('/code-writer')}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 
                         hover:from-blue-700 hover:to-cyan-700 
                         text-white py-3 px-6 rounded-lg font-medium
                         transition-all duration-200 transform hover:scale-[1.02]
                         flex items-center justify-center gap-2"
              >
                Write Code
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 