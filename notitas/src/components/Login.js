import React from 'react';
import '../Style-App/pages.css';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom'


function Login() {

  const [user, setUser] = useState({
    email:'',
    password:'',
  })
  const {logIn, loginWithGoogle}= useAuth()
  const navigate= useNavigate()

  const handleChange= ({target: {name, value}}) =>{
    setUser({...user,[name]: value});
  }

  const handleSubmit= async (e) => {
    e.preventDefault()
    try{
      await logIn(user.email, user.password);
      navigate('/notes');
    }catch(error){
      console.log(error.message);
    }
  }

  const handleGoogleSingIn= async() => {
    try{
      await loginWithGoogle();
      navigate('/notes');
    }catch(error){
      console.log(error.message);
    }
    
  }

    return(
      
        <div className='conteiner'>
            <h1 className='title'>Block.Notes</h1>
            <form className='form' onSubmit={handleSubmit}>
                <h2 className='subtitle'>Login</h2>
                <input className='input' placeholder='Escribe tu email' type='email' name='email' onChange={handleChange}/>
                <input className='input' placeholder='Escribe tu contraseña' type='password' name='password' onChange={handleChange}/>
                <button className='btnAuth'>Iniciar Sesión</button>
            </form>
            <button onClick={handleGoogleSingIn}>login with google</button>
            <Link to="/register">Registrate</Link>
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&family=Karla:wght@200;800&display=swap" rel="stylesheet"></link>
        </div>
     
    );
}

export default Login;