//import React, { useState, useEffect, useReducer } from 'react';
//import MainHeader from './components/MainHeader/MainHeader';
//import Card from './components/UI/Card/Card';
//import classes from './Login.module.css';
//import classes from './components/Login/Login.module.css'
//import Button from '../UI/Button/Button';
//import Button from './components/UI/Button/Button';

import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  useEffect(() => {
    const loggedInInfo = localStorage.getItem('isLoggedIn');

    if (loggedInInfo === "Yes") {
      setIsLoggedIn(true);
    }
  }, [])

  const loginHandler = (email, password, college) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn','Yes')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  
  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
      }}
      >
      <MainHeader/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;