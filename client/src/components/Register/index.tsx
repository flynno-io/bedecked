import React, { useState, ChangeEvent, FormEvent } from 'react';
import { UserRegister } from '../../interfaces/UserRegister';

function Register() {
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    document.body.className = ''; // Clear existing classes
    document.body.classList.add(`theme-${selectedTheme}`);
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    setSubmitted(false);
  };

  const [userData, setUserData] = useState<UserRegister>({
    manaTheme: '',
    username: '',
    email: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    setSubmitted(false);
  };

  const handleRegistration = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.manaTheme === '' || userData.username === '' || userData.email === '' || userData.password === '') {
      setError(true);
    } else {
      setError(false);
      setSubmitted(true);
    }
  };

  const successMessage = (): JSX.Element => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <h3>{userData.username} successfully registered!</h3>
      </div>
    );
  };

  const errorMessage = (): JSX.Element => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}
      >
        <h3>Please ensure all fields are filled!</h3>
      </div>
    );
  };

  return (
    <form name="register" className="registration" onSubmit={handleRegistration}>

      <select id="manaColor" name="manaTheme" onChange={handleThemeChange}>
        <option value="default">Mana Theme</option>
        <option value="colorless">Colorless</option>
        <option value="white">White</option>
        <option value="blue">Blue</option>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
      </select>
      <input
        type="text"
        placeholder="Username"
        name="username"
        autoComplete="on"
        onChange={handleChange}
        value={userData.username}
      />
      <input
        id="email"
        type="email"
        placeholder="Email Address"
        name="email"
        autoComplete="on"
        onChange={handleChange}
        value={userData.email}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        autoComplete="on"
        onChange={handleChange}
        value={userData.password}
      />
      <button type="submit" id="registrationConfirm">
        Register
      </button>
      <div className="regmessages">
        {errorMessage()}
        {successMessage()}
      </div>
    </form>
  );
}

export default Register;