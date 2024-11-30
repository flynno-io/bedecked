// src/pages/MainPage.tsx

import '../../styles/main.scss';
import { useNavigate } from "react-router-dom"

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login")
  };

  return (
    <section className="mainpage">
      <h1>Welcome to Bedecked</h1>
      <p>Compile your first deck!</p>
      <button onClick={handleClick}>Get Started</button>
    </section>
  )
}

export default MainPage