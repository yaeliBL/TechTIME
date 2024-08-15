import React, { useState } from 'react';
import './Login.css';
import logo from '../../imges/logoAirplan.png'; 
import { useDispatch, useSelector } from 'react-redux';

export default function LoginN() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const errorMessage = useSelector( (state) => state.user.errorNumber)


    const checkLogin={
        "mail": mail,
        "password": password
    };

    const getErrorMessage = () => {
      switch (errorMessage) {
          case 401:
              return "Password not correct";
          case 404:
              return "User not exists";
          default:
              return " ";
      }
  }; 
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch({
            type: 'LOG_IN',
            payload: checkLogin
          })
        setMail('');
        setPassword('');
      };

  return (
<form onSubmit={handleSubmit} className="login-container">
      <div className="login-form">
        <input type="email" placeholder="mail" className="login-input" value={mail} onChange={e => setMail(e.target.value)} />
        <input type="password" placeholder="password" className="login-input" onChange={e => setPassword(e.target.value)}/>
         <div className="error-message">{getErrorMessage()}</div>
        <button className="login-button" type='submit' >Log in</button>
      </div>
    </form>
  );
}
