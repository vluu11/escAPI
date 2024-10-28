import React, { useEffect } from 'react';

const TextToSpeech: React.FC = () => {
  useEffect(() => {
    // Ensure the script is loaded
    const script = document.createElement('script');
    script.src = "https://code.responsivevoice.org/responsivevoice.js?key=cQu3eXVf";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const speak = (text: string) => {
    // Check if responsiveVoice is available before calling
    if ((window as any).responsiveVoice) {
      (window as any).responsiveVoice.speak(text);
    }
  };

  return (
    <div>
      <h1>Text to Speech Example</h1>
      <button onClick={() => speak("Hello, this is a text to speech example!")}>
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;