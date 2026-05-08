import React from 'react';
import logoImg from '../../assets/logo.png';

const Logo = ({ className = "h-11 w-11", showText = true }) => {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      <div className={`${className} overflow-hidden rounded-full shadow-lg transition-transform group-hover:scale-105 duration-300 flex items-center justify-center bg-[#0a3d4d]`}>
        <img src={logoImg} alt="Sunnah Stream" className="w-full h-full object-cover scale-[1.6]" />
      </div>
      {showText && (
        <span className="text-xl font-bold tracking-tighter text-primary">
          SUNNAH<span className="font-light text-brand-teal">STREAM</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
