import React from 'react';
import Logo from './campuseats.jpeg';

const Header = () => {
  return (
    <header className="top-0 left-0 right-0 h-16 md:h-32 lg:h-40 overflow-hidden mb-0">
      <img
        src={Logo}
        alt="Header Image"
        className="w-full h-full object-cover"
      />
    </header>
  );
};

export default Header;
