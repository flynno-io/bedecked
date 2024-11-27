import { useState, FormEvent, ChangeEvent } from 'react';
import Auth from '../../utils/auth';
import { login } from "../../api/authAPI";

function Login() {
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
 )
}

export default Login;