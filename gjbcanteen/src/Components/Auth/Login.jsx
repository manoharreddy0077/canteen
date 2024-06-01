import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPassword, setUsername } from '../../store/actions.mjs';
import './Login.css';
// import { LoginSharp } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [FormData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...FormData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData),
    });

    if (response.ok) {
      setIsLoggedIn(true);
      dispatch(setUsername(FormData.username));
      dispatch(setPassword(FormData.password));
      navigate('/MenuList');
    } else {
      alert("Incorrect credentials");
      setError('Wrong username or password. Please try again');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='login_form'>
        <h2 className='form_heading'>Already a User? Login !!</h2>
        <div className="form_body">
          <div className='form_element'>
            <label>Username:</label>
            <input type="text" name='username' value={FormData.username} onChange={handleChange} />
          </div>
          <div className='form_element'>
            <label>Password:</label>
            <input type="password" name='password' value={FormData.password} onChange={handleChange} />
          </div>
          {error && <p className='error'>{error}</p>}
          <div className='form_button'>
            <button type='submit'>Login</button>
          </div>
        </div>
        {/* <div className='login_prompt'>
          Not an User? <Link to='/register'>Register first</Link>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
