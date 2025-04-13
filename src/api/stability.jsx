const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const validateApiKey = (apiKey) => {
  if (!apiKey) {
    throw new Error("API key is missing. Please check your .env file and ensure VITE_REACT_APP_STABILITY_API_KEY is set.");
  }
  if (!apiKey.startsWith('sk-')) {
    throw new Error("Invalid API key format. Stability AI API keys should start with 'sk-'.");
  }
  return true;
};

const generateImage = async (prompt, maxRetries = 3) => {
  let retryCount = 0;
  let lastError = null;
  const apiKey = import.meta.env.VITE_REACT_APP_STABILITY_API_KEY;

  try {
    validateApiKey(apiKey);
  } catch (error) {
    console.error("API Key validation failed:", error.message);
    throw error;
  }

  while (retryCount < maxRetries) {
    try {
      const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          height: 512,
          width: 512,
          samples: 1,
          steps: 30,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please check your Stability AI API key in the .env file.");
        } else if (response.status === 429) {
          const delay = Math.pow(2, retryCount) * 1000;
          console.log(`Rate limit hit. Retrying in ${delay/1000} seconds...`);
          await sleep(delay);
          retryCount++;
          continue;
        } else if (response.status === 400) {
          throw new Error("Invalid request. Please check your prompt and try again.");
        } else if (response.status === 404) {
          throw new Error("API endpoint not found. Please check if the API URL is correct.");
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      }

      const data = await response.json();

      if (data?.artifacts?.length > 0) {
        return `data:image/png;base64,${data.artifacts[0].base64}`;
      } else {
        throw new Error("No image was generated. Please try again with a different prompt.");
      }
    } catch (error) {
      console.error(`Image generation attempt ${retryCount + 1} failed:`, error);
      lastError = error;
      if (error.message.includes("Rate limit")) {
        retryCount++;
        continue;
      }
      throw error;
    }
  }

  throw new Error(`Failed after ${maxRetries} retries. ${lastError?.message || 'Unknown error'}`);
};

export { generateImage };

