import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/AuthContext';
import Input from '../UI/Input/Input';

const emailReducer = (state,action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'INPUT_BLUR'){
    return {value: state.value,isValid : state.value.includes('@')};
  }
  return {value:'',isValid:false};
};

const collegeReducer = (state,action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length>0};
  }
  if (action.type === 'INPUT_BLUR'){
    return {value: state.value,isValid : state.value.trim().length>0};
  }
  return {value:'',isValid:false};
};

const passwordReducer = (state,action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR'){
    return {value:state.value, isValid:state.value.trim().length > 6};
  }
  return {value:'',isValid:false};
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  //const [enteredCollege, setEnteredCollege] = useState('');
  //const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{
    value:'',
    isValid:null
  });

  const [collegeState, dispatchCollege] = useReducer(collegeReducer,{
    value:'',
    isValid:null
  });  

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value:'',
    isValid:null   
  })

  const authCtx = useContext(AuthContext)

  useEffect(()=> {
    console.log('effect running')
    return () => {
      console.log('effect cleanup')
    }
  }, [])

  const {isValid:emailIsValid} = emailState;
  const {isValid:collegeIsValid} = collegeState;
  const {isValid:passwordIsValid} = passwordState;

  useEffect(()=> {
    const identifier = setTimeout(() => {
      console.log("checking")
      setFormIsValid(
        emailIsValid && passwordIsValid && collegeIsValid
      );
    },2000)

    return ()=>{
      console.log('clean up');
      clearTimeout(identifier)
    }
  },[emailIsValid,collegeIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type : 'USER_INPUT', val:event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && collegeState.isValid
    );

  };

  const collegeChangeHandler = (event) => {
    //setEnteredCollege(event.target.value);
    dispatchCollege({type:'USER_INPUT', val: event.target.value})
    setFormIsValid(
      emailState.isValid && passwordState.isValid && event.target.value.trim().length > 0
    );

  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT', val: event.target.value})

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && collegeState.isValid
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setCollegeIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const validateCollegeHandler = () => {
    //setCollegeIsValid(enteredCollege.trim().length > 0);
    dispatchCollege({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id="email"
          label="E-Mail" 
          type="email" 
          isValid={emailIsValid} 
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          />

        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>

        <Input 
          id="password"
          label="PassWord" 
          type="password" 
          isValid={passwordIsValid} 
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;