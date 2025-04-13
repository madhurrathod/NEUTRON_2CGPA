import { useState } from "react";
import { generateImage } from "../api/stability";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");
      setRetryCount(0);
      const img = await generateImage(prompt);
      setImage(img);
    } catch (err) {
      if (err.message.includes("API key")) {
        setError(
          <div className="space-y-2">
            <p className="text-red-600 dark:text-red-400">{err.message}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please check your .env file and ensure you have a valid Stability AI API key.
              You can get one from <a href="https://stability.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">stability.ai</a>
            </p>
          </div>
        );
      } else if (err.message.includes("Rate limit")) {
        setError("Rate limit exceeded. Please wait a moment before trying again.");
      } else {
        setError(err.message || "Image generation failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row p-6 pt-12 gap-6">
      <div className="md:w-1/3 flex flex-col gap-6">
        <div className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-xl shadow-lg p-6 border border-white/20 dark:border-gray-700/30">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">AI Image Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Transform your ideas into stunning visuals</p>
          
          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe something creative..."
              className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded-lg 
                        bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200
                        focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        transition-all duration-200 resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={!prompt || loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 
                       hover:from-purple-700 hover:to-indigo-700 
                       text-white py-3 px-6 rounded-lg font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 transform hover:scale-[1.02]
                       flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {retryCount > 0 ? `Retrying (${retryCount})...` : "Generating..."}
                </>
              ) : (
                "Generate Image"
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              {typeof error === 'string' ? (
                <p className="text-red-600 dark:text-red-400">{error}</p>
              ) : (
                error
              )}
            </div>
          )}
        </div>
      </div>

      <div className="md:w-2/3 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-xl shadow-lg p-6 border border-white/20 dark:border-gray-700/30">
        <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {retryCount > 0 ? `Retrying (${retryCount})...` : "Creating your masterpiece..."}
              </p>
            </div>
          ) : image ? (
            <img
              src={image}
              alt="Generated artwork"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg">Your generated image will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;