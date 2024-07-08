import React, { FC } from "react";
import Logo from "../assets/images/logo_sevres.png" // Chemin vers le logo
import "tailwindcss/tailwind.css";


const Header: FC = () => (
<header className="fixed top-0 left-0 w-full bg-black font-markpro z-50 border-b-2 border-black -700/40 text-center">
    <div className="p-4 flex gap-4 justify-center">
    <a href="/">{/* Utilisation de Link pour le lien */}
      <img src={Logo} alt="Logo" className="w-16 h-16 cursor-pointer" />
    </a>
    <h1 className=" items-center text-center text-5xl text-white"> Assistance IA de la Mairie de Sevres</h1>
    </div>
  </header>
);

export default Header;