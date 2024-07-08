import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Microphone from '../assets/images/microphone.png';
import fleche from '../assets/images/Vector.png';
import triangle from '../assets/images/triangle.png';
import triangle_white from '../assets/images/triangle_white.png';
import logo_bot from '../assets/images/logo_bot.png';

const Prompt: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputDictionary, setInputDictionary] = useState<{ [key: number]: string }>({});
  const [responseDictionary, setResponseDictionary] = useState<{ [key: number]: string }>({});
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLLIElement>(null);


  // Speech recognition hooks
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    const savedInputValues = localStorage.getItem('inputValues');
    const savedResponseValues = localStorage.getItem('responseValues');
    if (savedInputValues) {
      setInputDictionary(JSON.parse(savedInputValues));
    }
    if (savedResponseValues) {
      setResponseDictionary(JSON.parse(savedResponseValues));
    }
  }, []);

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [inputDictionary]);
  

  if (!browserSupportsSpeechRecognition) {
    return <span>Le navigateur ne prend pas en charge la reconnaissance vocale.</span>;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(inputValue === '') return;
    const newInputDictionary = { ...inputDictionary };
    const newResponseDictionary = { ...responseDictionary };

    const newIndex = Object.keys(inputDictionary).length;

    newInputDictionary[newIndex] = inputValue;
    newResponseDictionary[newIndex] = "Réponse";

    setInputDictionary(newInputDictionary);
    setResponseDictionary(newResponseDictionary);

    localStorage.setItem('inputValues', JSON.stringify(newInputDictionary));
    localStorage.setItem('responseValues', JSON.stringify(newResponseDictionary));

    setInputValue('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleListening = () => {
    setIsListening((prevIsListening) => !prevIsListening);
    resetTranscript(); 
  };

  return (
    <div className="flex flex-col items-center">
     
      <div className='w-full mb-3 flex justify-center items-center'>
        <ul  className="flex flex-col items-stretch w-full max-w-xl mb-4 h-[65vh] overflow-y-scroll" >
          {Object.keys(inputDictionary).map((key, index) => (
            <li key={key}  ref={messagesEndRef}  id={`input_${index}`} className="flex flex-col gap-3 mx-16" onClick={() => console.log(`ID: input_${key}`)}> 
             
               
             <div className='self-end relative px-6 pt-3 pb-3 min-w-40 h-fit max-w-full rounded-md rounded-br-none bg-[#6C73A2] text-white'>
                <div className='break-words'>{inputDictionary[key]}</div>
                <img className='absolute bottom-0 -right-4 w-4 h-4' src={triangle} alt="triangle"></img>
            </div>

                <div  className='flex self-start relative pb-3 px-6 pt-2 rounded-md rounded-bl-none max-w-full h-fit  min-w-40 mb-8 bg-[#D9D9D9] '> 
                  <img src={logo_bot} alt="logo bot" className='absolute bottom-0 w-8 h-8 -left-16' />
                  {responseDictionary[key]}
                  <img  src={triangle_white}  className='absolute bottom-0 -left-4 w-4 h-4' alt="" />
                </div>
            </li>
          ))}
          
        </ul>
        
        <div className='flex flex-col justify-end fixed bottom-0 w-full px-1 mb-4 bg-custom-bg-color'>
          <form onSubmit={handleSubmit} method="post" className="w-full flex items-center justify-center gap-5">
            <input
              className="w-full max-w-xl px-3 py-3 border border-gray-300 rounded-3xl shadow-sm"
              type="text"
              name='text'
              placeholder='Entrez votre texte ici'  
              autoComplete='off'
              value={inputValue}
              onChange={handleInputChange}
            />
            <button>
              <img src={fleche} alt="fleche de submit" className='w-10 h-10' />
            </button>
          </form>

          <div className="flex flex-col items-center w-full h-full ">
            <div className="mb-3">
              <p className=" text-lg">Microphone: {isListening ? 'activé' : 'désactivé'}</p>
            </div>

            <div className="flex justify-center items-center mt-auto">
              <img onClick={toggleListening} className="w-16 h-16 cursor-pointer mr-4" src={Microphone} alt="Micro" />
              <button onClick={resetTranscript} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 ${isListening ? '' : 'hidden'}`}>Réinitialiser</button>
            </div>

            {/* <p className="text-xl">{transcript}</p> */}
          </div>
        </div>
      </div>

      

    </div>
  );
};

export default Prompt;