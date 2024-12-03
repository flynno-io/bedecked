import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../context/AuthContext';
import './Avatar.scss';
import '../../../styles/_themes.scss';

interface JwtPayload {
  username: string;
}

function Avatar() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode<JwtPayload>(token);
          setUsername(decodedToken.username);
        } catch (error) {
          console.error('Failed to decode token', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const authContext = useContext(AuthContext);

  return (
    <div className="avatara">
      {authContext?.isAuthenticated ? (
        <div>
      <div className="avatar"></div>
      <div className="greeting">{username}</div>
        </div>
      ) : (
        <div className="avatar"></div>
      )}
    </div>
  );
}

export default Avatar;