import React from 'react';

import authContext from '../context/authContext.js';

const ProvideAuth = ({ children }) => {
  const getToken = () => localStorage.getItem('token');
  const getUsername = () => localStorage.getItem('username');
  const isLoggedIn = () => _.has(localStorage, 'token');
  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  };
  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  return (
    <authContext.Provider value={{
      getToken, getUsername, isLoggedIn, logIn, logOut,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default ProvideAuth;
