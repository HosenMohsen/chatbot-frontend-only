import React from 'react';
import 'tailwindcss/tailwind.css';
import Prompt from './Prompt';

const Modal: React.FC = () => {
  return (
    <div className="modal fixed inset-0 overflow-y-auto bg-custom-bg-color  flex flex-col">
      <div className=" bg-custom-top-color min-h-[70px]"></div>
      <div className="modal-content flex-grow flex flex-col p-4">
        <Prompt />
      </div>
    </div>
  );
};

export default Modal;
