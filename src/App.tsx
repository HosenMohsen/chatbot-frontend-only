/* import React from 'react'; */
import 'tailwindcss/tailwind.css';
import Modal from './components/Modal';
import { useState } from 'react';
import Logo from './assets/images/logo_bot.png';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  /* const handleClick = () => {
    setModalOpen(true);
  };
 */
  const toggleModal= ()  => {
    setModalOpen(!modalOpen);
  }
  

  return (
    <div className='fixed w-full' style={{ top: '500px', right: '0' }}>
      <img  className='w-16 h-16 float-right mr-7' src={Logo} onClick={toggleModal}/>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Modal/>
          </div>
        </div>
      )}
    </div>
  );
};





export default App;