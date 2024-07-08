import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import fleche from '../assets/images/Vector.png';

interface InputFormProps {
  onSubmit: (inputValue: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit}) => {
  const [inputValue, setInputValue] = useState('');
  const [submittedValues, setSubmittedValues] = useState<{ [key: string]: string }>({});

  // Charger les valeurs du localStorage au chargement du composant
  useEffect(() => {
    const savedValues = localStorage.getItem('inputValues');
    if (savedValues) {
      setSubmittedValues(JSON.parse(savedValues));
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedValues({ ...submittedValues, [inputValue]: inputValue });
    localStorage.setItem('inputValues', JSON.stringify({ ...submittedValues, [inputValue]: inputValue }));
    onSubmit(inputValue);
    setInputValue(''); // Réinitialise la valeur de l'input après la soumission
  };

  return (
    <div className='w-full mb-10'>
      <h2 className="text-center mb-2">Inputs sauvegardés :</h2>
      <ul className="mb-4">
        {Object.keys(submittedValues).map((key) => (
          <li key={key} className="text-center">{key}: {submittedValues[key]}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} method="post" className="flex items-center">
        <input
          className="w-full mt-6 mb-3 px-3 py-3 border border-gray-300 rounded-3xl shadow-sm"
          type="text"
          name='text'
          placeholder='Entrez votre texte ici'
          autoComplete='off'
          value={inputValue}
          onChange={handleInputChange}
        />
        <button>
          <img src={fleche} alt="fleche de submit" className=' ml-3 w-10 h-10  mt-3' />
        </button>
      </form>
    </div>
  );
};

export default InputForm;
