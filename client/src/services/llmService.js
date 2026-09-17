// Configure your local Ollama URL here. 
// If running on a physical device over WiFi, use your computer's local IP
// If using ngrok, use your ngrok URL.
export const OLLAMA_API_URL = 'http://192.168.0.185:11434/api/generate';

// Set your preferred local model here
export const OLLAMA_MODEL = 'qwen2.5:3b'; 

export const generateLlmResponse = async (prompt, systemPrompt = '') => {
  // Keeping the original function for fallback/reference
  try {
    console.log(`Sending request to Ollama (${OLLAMA_API_URL}) using model: ${OLLAMA_MODEL}...`);
    
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: prompt,
        system: systemPrompt,
        stream: false, 
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error fetching from Ollama:', error);
    return "I'm having trouble connecting to my local AI brain right now. Make sure Ollama is running, the model is downloaded, and the IP address in llmService.js is correct!";
  }
};

export const generateLlmResponseStream = (prompt, systemPrompt = '', onTokenReceived) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', OLLAMA_API_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    let fullFinalResponse = '';

    xhr.onprogress = () => {
      const responseText = xhr.responseText;
      if (!responseText) return;
      
      const lines = responseText.split('\n');
      let currentText = '';
      
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) {
            currentText += parsed.response;
          }
        } catch (e) {
          // Ignore incomplete JSON chunks at the end of the stream
        }
      }
      
      fullFinalResponse = currentText;
      onTokenReceived(currentText);
    };

    xhr.onload = () => {
      resolve(fullFinalResponse);
    };

    xhr.onerror = (e) => {
      console.error('XHR Error:', e);
      reject(new Error('Network error'));
    };

    xhr.send(JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: prompt,
      system: systemPrompt,
      stream: true, // Enable streaming
    }));
  });
};
