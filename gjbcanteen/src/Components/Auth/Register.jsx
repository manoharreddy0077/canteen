import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [usernameError, setUsernameError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      const usernameRegex = /^PES120210\d{4}$/;

      if (!usernameRegex.test(value) && value !== '') {
        setUsernameError('Username should start with PES120210 and end with a 4-digit number between 1000 and 3000');
      } else {
        setUsernameError('');
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameError) {
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
        alert('Success');
      } else {
        // Use the response status to check the HTTP status code
        if (response.status === 400) {
          alert('Email already registered');
        } else {
          alert('Server error');
        }
      }
    } catch (error) {
      alert(error);
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
          </div>
          <div className='form_button'>
            <button type='submit'>Register</button>
          </div>
        </div>
        {/* <div className='login_prompt'>
          Already a User? <a href='/login'>Login</a>
        </div> */}
      </form>
    </div>
  );
};

export default Register;
