import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setPassword, setUsername } from '../../store/actions.js';
// import { useHistory } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
    // const history=useHistory();
    const dispatch=useDispatch();
    

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error,setError]=useState('')
    const [FormData,setFormData]=useState({
        username:'',
        password:''
    })
    // useEffect(()=>{
    //     dispatch(setUsername(FormData.username));
    //     dispatch(setPassword(FormData.password));

    //     navigate('/MenuList');
    // },[FormData.username,FormData.password,dispatch,navigate])
const handleChange=(e)=>{
    const{name,value}=e.target;
    setFormData({
        ...FormData,
        [name]:value
    })  
}
const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch('http://localhost:3001/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(FormData),
    });

    if (response.ok) {
      setIsLoggedIn(true);
      // alert('You are now on the canteen page');
      
      dispatch(setUsername(FormData.username));
      dispatch(setPassword(FormData.password));
      navigate('/MenuList');
    }else{
      alert("incorrect crenditials")
        setError('wrong username or password .please try again')
    }
}
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <h2>Already a User ? Login !!</h2>
        <div >
            <label>Username :</label>
            <input type="text" name='username' value={FormData.username} onChange={handleChange}/>
        </div>
        <div >
            <label>Password :</label>
            <input type="password" name='password' value={FormData.password} onChange={handleChange}/>
        </div>
        <div>
            <button type='submit' >Login</button>
        </div>
      </form>
      {/* {isLoggedIn && <Link to="/MenuList">Go to MenuList</Link>} */}
    </div>
  )
}

export default Login