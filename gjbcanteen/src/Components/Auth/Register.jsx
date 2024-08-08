

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearState } from '../../store/actions.mjs';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector('.form').classList.add('fade-in');
  }, []);

  const validateUsername = (username) => {
    const usernameRegex = /^PES120210\d{4}$/;
    if (!usernameRegex.test(username) && username !== '') {
      setUsernameError('Username should start with PES120210 and end with a 4-digit number between 1000 and 3000');
    } else {
      setUsernameError('');
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character');
    } else {
      setPasswordError('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'username') {
      validateUsername(value);
    } else if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameError || passwordError) {
      alert('Please fix the errors before submitting the form');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        dispatch(clearState());
        alert('Registration successful');
      } else {
        const errorResponse = await response.json();
        alert(errorResponse.message || 'Server error');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <h2 className='form_heading'>New User? Register!!</h2>
        <div className='form_body'>
          <div className='form_element'>
            <label>Email:</label>
            <input type='email' name='email' value={formData.email} onChange={handleChange} />
          </div>
          <div className='form_element'>
            <label>Username:</label>
            <input type='text' name='username' value={formData.username} onChange={handleChange} />
            {usernameError && <p className='error'>{usernameError}</p>}
          </div>
          <div className='form_element'>
            <label>Password:</label>
            <input type='password' name='password' value={formData.password} onChange={handleChange} />
            {passwordError && <p className='error'>{passwordError}</p>}
          </div>
          <div className='form_button'>
            <button type='submit'>Register</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
