import React from 'react'
import { useSelector } from 'react-redux';
import profile from './profile.jpeg'
const User = () => {
    const username = useSelector(state => state.auth.username);
    return (
        <div>
            <div>
                <img src={profile} alt="Profile Picture" style={{ width: '100px', height: 'auto', borderRadius: '50%' }} />
                <span>{username}</span>
            </div>
        </div>
    );
}

export default User
