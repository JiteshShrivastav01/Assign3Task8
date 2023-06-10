//import React, { useState, useEffect, useReducer } from 'react';
//import MainHeader from './components/MainHeader/MainHeader';
//import Card from './components/UI/Card/Card';
//import classes from './Login.module.css';
//import classes from './components/Login/Login.module.css'
//import Button from '../UI/Button/Button';
//import Button from './components/UI/Button/Button';


import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/AuthContext';
import React,{useContext} from 'react';


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // useEffect(() => {
  // //   const loggedInInfo = localStorage.getItem('isLoggedIn');

  // //   if (loggedInInfo === "Yes") {
  // //     setIsLoggedIn(true);
  // //   }
  // // }, [])

  // const loginHandler = (email, password, college) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  // };

  const ctx =useContext(AuthContext)
  return (
    <React.Fragment>
      <MainHeader/>
      <main>
        {!ctx.isLoggedIn && <Login/>}
        {ctx.isLoggedIn && <Home/>}
      </main>
      
    </React.Fragment>    
  );
}

export default App;