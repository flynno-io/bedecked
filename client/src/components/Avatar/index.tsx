import { useState, useEffect } from 'react';
import './Avatar.scss';
import '../../../styles/_themes.scss';

function Avatar() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = () => {
          const storedUsername = localStorage.getItem('username');
          if (storedUsername) {
            setUsername(storedUsername);
          }
        };

        fetchUsername();
    }, []);

    return (
        <div className="avatara">
            <div className="avatar"></div>
            <div className="greeting">{username}</div>
        </div>
    );
}

export default Avatar;