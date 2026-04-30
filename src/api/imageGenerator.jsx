const sleep = (ms) => new Promise(res => setTimeout(res, ms));

const generateImage = async (prompt, maxRetries = 3) => {
  const apiKey = import.meta.env.VITE_REACT_APP_HF_API_KEY;

  if (!apiKey) {
    throw new Error("Missing HuggingFace API key");
  }

  let retry = 0;

  while (retry < maxRetries) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        if (response.status === 503) {
          // model loading
          await sleep(2000);
          retry++;
          continue;
        }
        throw new Error(`HF API error: ${response.status}`);
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (err) {
      retry++;
      if (retry >= maxRetries) throw err;
    }
  }
};

export { generateImage };
