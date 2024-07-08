import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Microphone from '../assets/images/microphone.png';

const Dictaphone = () => {
  const [isListening, setIsListening] = useState(false);
  const [isResetVisible, setIsResetVisible] = useState(false);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const toggleListening = () => {
    if (!isListening) {
      setIsResetVisible(true);
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
    setIsListening(!isListening);
  };

  const handleReset = () => {
    resetTranscript();
    setIsResetVisible(false);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Le navigateur ne prend pas en charge la reconnaissance vocale.</span>;
  }

  return (
    <div className='relative top-30 flex flex-col items-center justify-end w-full h-full'>
      <div className="mb-4">
        <p>Microphone: {isListening ? 'activé' : 'désactivé'}</p>
      </div>

      <div className="flex justify-center items-center mt-auto">
        <img onClick={toggleListening} className="w-16 h-16 cursor-pointer mr-4" src={Microphone} alt="Micro" />
        {isResetVisible && (
          <button onClick={handleReset} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">Réinitialiser</button>
        )}
      </div>

      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;
