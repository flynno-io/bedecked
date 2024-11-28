function Register() {
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    document.body.className = ''; // Clear existing classes
    document.body.classList.add(`theme-${selectedTheme}`);
  };
  
  return (
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
  );
}

export default Register;