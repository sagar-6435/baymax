// Configure your local Ollama URL here. 
// If running on a physical device over WiFi, use your computer's local IP
// If using ngrok, use your ngrok URL.
export const OLLAMA_API_URL = 'http://192.168.29.63:11434/api/generate';

// Set your preferred local model here
export const OLLAMA_MODEL = 'llama3.2:1b'; // Switched to 1B model for faster local inference

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
  // --- DEMO MOCK INTERCEPTOR ---
  const lowerPrompt = prompt.toLowerCase();
  
  const mockResponses = [
    { key: "headache", text: "I'm sorry to hear you have a headache. Make sure to drink plenty of water, rest in a quiet, dark room, and consider taking an over-the-counter pain reliever like acetaminophen or ibuprofen. If it persists or is exceptionally severe, please consult a doctor." },
    { key: "burn", text: "For a minor burn, immediately run cool (not cold) water over the area for 10-15 minutes. Do not apply ice. Cover it with a sterile, non-adhesive bandage. If the burn is severe, large, or on your face/hands, seek emergency medical care immediately." },
    { key: "sleep better", text: "To improve your sleep, try to maintain a consistent sleep schedule, even on weekends. Avoid screens (phones, TVs) for at least an hour before bed, and make sure your bedroom is cool and dark. Avoid heavy meals and caffeine late in the day." },
    { key: "healthy diet", text: "A healthy diet involves balancing your macronutrients. Focus on eating plenty of vegetables, fruits, lean proteins (like chicken or beans), and whole grains. Try to limit processed foods, added sugars, and excessive sodium. Staying hydrated is also key!" },
    { key: "tips for managing", text: "Managing a chronic condition requires consistency. Make sure you are taking your medications exactly as prescribed, attending all your doctor's appointments, and monitoring your symptoms daily. Eating well and getting mild exercise can also greatly improve your quality of life." }
  ];

  for (const mock of mockResponses) {
    if (lowerPrompt.includes(mock.key)) {
      return new Promise((resolve) => {
        let currentText = '';
        const words = mock.text.split(' ');
        let i = 0;
        
        const interval = setInterval(() => {
          if (i < words.length) {
            currentText += (i === 0 ? '' : ' ') + words[i];
            onTokenReceived(currentText);
            i++;
          } else {
            clearInterval(interval);
            resolve(currentText);
          }
        }, 50);
      });
    }
  }
  // --- END DEMO MOCK ---

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', OLLAMA_API_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    let fullFinalResponse = '';
    let lastProcessedIndex = 0;
    
    // Throttle UI updates to avoid freezing the JS thread with rapid re-renders
    let lastUpdateTime = 0;
    const UPDATE_INTERVAL_MS = 60; // 60ms is roughly 16 frames

    xhr.onprogress = () => {
      const responseText = xhr.responseText;
      if (!responseText) return;
      
      // Process only new chunks to avoid O(N^2) lag on UI thread
      const newData = responseText.substring(lastProcessedIndex);
      const lines = newData.split('\n');
      
      let chunkText = '';
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) {
            chunkText += parsed.response;
            lastProcessedIndex += line.length + 1; // +1 for the newline
          }
        } catch (e) {
          // Incomplete JSON at the end, will be processed in next onprogress event
        }
      }
      
      if (chunkText) {
        fullFinalResponse += chunkText;
        
        const now = Date.now();
        if (now - lastUpdateTime >= UPDATE_INTERVAL_MS) {
          onTokenReceived(fullFinalResponse);
          lastUpdateTime = now;
        }
      }
    };

    xhr.onload = () => {
      // Ensure the very last token is updated even if it fell within the throttle window
      onTokenReceived(fullFinalResponse);
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
