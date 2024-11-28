// src/pages/LoginSignUpPage.tsx

import React, { useState } from 'react';
import Logo from '../components/LoginLogo';
import Login from '../components/Login';
import Register from '../components/Register';
import '../../styles/loginRegister.scss';

const LoginSignUpPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLogin(e.target.id === 'login');
  };

  return (
    <section className="register">
      <Logo />
      <div className="login-toggle">
        <input name="login" type="radio" id="login" onChange={handleToggleChange} />
        <div className="toggle-slider" />
        <label htmlFor="login">Login</label>
        <input name="login" type="radio" id="register" defaultChecked onChange={handleToggleChange} />
        <label htmlFor="register">New User</label>
      </div>
      {isLogin ? (
        <Login />
      ) : (
        <Register />
      )}
    </section>
  )
}

export default LoginSignUpPage;