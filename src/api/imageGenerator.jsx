const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  const generateImage = async (prompt) => {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
};

  let retry = 0;

  while (retry < maxRetries) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney",
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
