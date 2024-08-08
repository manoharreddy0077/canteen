import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Components/Header';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderRoutes = ['/'];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
    </>
  );
};

export default Layout;
