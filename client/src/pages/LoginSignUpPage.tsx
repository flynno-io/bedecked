// src/pages/LoginSignUpPage.tsx

import Logo from '../components/Logo';
import manaTheme from '../components/Themes';
import '../../styles/_themes.scss';
import '../../styles/loginRegister.scss';

const LoginSignUpPage = () => {
  const theme = manaTheme('manaTheme');

  return (
    <section className="register">
      <theme />
      <Logo />
      <form className="registration">
        <div className="login-toggle">
          <input name="login" type="radio" id="login" />
          <div className="toggle-slider" />
          <label htmlFor="login">Login</label>
          <input name="login" type="radio" id="register" defaultChecked />
          <label htmlFor="register">New User</label>
        </div>
        <select id="manaColor">
          <option value="manaTheme">Mana Theme</option>
          <option value="colorless">Colorless</option>
         <option value="white">White</option>
          <option value="blue">Blue</option>
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
        </select>
       <input type="text" placeholder="Username" />
       <input type="email" placeholder="Email Address" />
       <input type="password" placeholder="Password" />
       <button type="button">Register</button>
      </form>
    </section>
  )
}

export default LoginSignUpPage