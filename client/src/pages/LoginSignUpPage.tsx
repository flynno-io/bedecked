// src/pages/LoginSignUpPage.tsx

import React, { useState, FormEvent, ChangeEvent } from 'react';
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import Logo from '../components/Logo';
import '../../styles/_themes.scss';
import '../../styles/loginRegister.scss';

const LoginSignUpPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    document.body.className = ''; // Clear existing classes
    document.body.classList.add(`theme-${selectedTheme}`);
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLogin(e.target.id === 'login');
  };
  
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

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
    } catch (err) {
      console.error('Failed to login', err);
    }
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
        <form name="login" className="login" onSubmit={handleLogin}>
          <input 
            type="text"
            placeholder="Username" 
            name="Username" 
            autoComplete="on" 
            value={loginData.username || ''}
            onChange={handleChange}
          />
          <input 
            type="password" 
            placeholder="Password" 
            name="Password" 
            autoComplete="on"
            value={loginData.password || ''}
            onChange={handleChange}  />
          <button type="submit" id="loginConfirm">Login</button>
        </form>
      ) : (
        <form name="register" className="registration">
          <select id="manaColor" onChange={handleThemeChange}>
            <option value="default">Mana Theme</option>
            <option value="colorless">Colorless</option>
            <option value="white">White</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
          <input type="text" placeholder="Username" name="Username" autoComplete="on" />
          <input id="email" type="email" placeholder="Email Address" name="Email" autoComplete="on" />
          <input type="password" placeholder="Password" name="Password" autoComplete="on" />
          <button type="submit" id="registrationConfirm">Register</button>
        </form>
      )}
    </section>
  )
}

export default LoginSignUpPage;