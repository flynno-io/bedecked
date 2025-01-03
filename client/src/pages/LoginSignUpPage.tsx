// src/pages/LoginSignUpPage.tsx

import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Logo from '../components/LoginLogo';
import Register from '../components/Register';
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import { AuthContext } from '../context/AuthContext';
import '../../styles/loginRegister.scss';

const LoginSignUpPage = () => {
  const authContext = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLogin(e.target.id === 'login');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log(loginData);
      const data = await login(loginData);
      Auth.login(data.token);
      authContext?.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  if (authContext?.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

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
        <form name="login" className="login" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="on"
            value={loginData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="on"
            value={loginData.password}
            onChange={handleChange}
          />
          <button type="submit" id="loginConfirm" onClick={handleLogin}>Login</button>
        </form>
      ) : (
        <Register />
      )}
    </section>
  );
};

export default LoginSignUpPage;