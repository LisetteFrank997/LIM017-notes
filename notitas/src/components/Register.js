import React from 'react';
import '../Style-App/pages.css';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom'


function Register() {
  
  const [user, setUser] = useState({
    email:'',
    password:'',
    displayName:'',
  })
  

  const {signUp}= useAuth()
  const navigate= useNavigate()

  const handleChange= ({target: {name, value}}) =>{
    setUser({...user,[name]: value});
  }

  const handleSubmit= async (e) => {
    e.preventDefault()
    try{
      await signUp(user.email, user.password, user.displayName);
      navigate('/notes');
    }catch(error){
      console.log(error.message);
    }
    console.log(user)
    
  }
    return(
        <div className='conteiner'>
            <h1 className='title'>Block.Notes</h1>
            <form className='formRegister' onSubmit={handleSubmit}>
              <h2 className='subtitle'>Registrate</h2>
              <input className='input' placeholder='Nombres' name='displayName' type='text' onChange={handleChange}/>
              <input className='input' placeholder='Registra un email' type='email' name='email' onChange={handleChange}/>
              <input className='input' placeholder='Crea una contraseña' type='password' name='password' onChange={handleChange}/>
              <button className='btnAuth'>Registrate</button>
            </form>
            <Link to="/">Volver al Login</Link>
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&family=Karla:wght@200;800&display=swap" rel="stylesheet"></link>
     </div>
    );
}

export default Register;

