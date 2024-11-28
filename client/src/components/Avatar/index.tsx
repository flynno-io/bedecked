import React, { useState } from 'react';
import './Avatar.scss';
import '../../../styles/_themes.scss';

function Avatar() {
    const [username, setUsername] = useState('JohnDoe');

    return (
        <div className="avatara">
            <div className="avatar"></div>
            <div className="greeting">{username}</div>
        </div>
    );
}

export default Avatar;