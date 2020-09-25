import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword,  handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, resetPassword, signInWithEmailAndPassword } from './LoginManager';



function Login() {
  
  const [newUser,setNewUser] =  useState(false);
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let {from} = location.state || { from: { pathname: "/" } };

  initializeLoginFrameWork();

  const [user,setUser] = useState({
    isSignIn : false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false
  })

  
  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res => {
      setUser(res)
      setLoggedInUser(res);
      history.replace(from)
    })
  }
  
  const signOut = () =>{
    handleSignOut()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
    })
  }

  const handleSubmit = (e) =>{
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })

    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
     
      
    }
    e.preventDefault();
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
        isFieldValid =/\S+@\S+\.\S+/.test(e.target.value);

    }
    if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFieldValid =  isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo =  {...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo); 
    }
  }

 
  
  return (
    <div className="App">
       { 
        user.isSignIn ?<button onClick={signOut}>Sign Out</button>  : <button onClick={googleSignIn}>Sign In</button>
      } 
      <h3>Our Own Authentication</h3>
       <input type="checkbox" onChange={() => setNewUser(!newUser)} id=""/>
       <label htmlFor="newUser">Sign Up as new user</label>
       <br/>
      <form onSubmit={handleSubmit}>
      {newUser && <input type="text"  name='name' onBlur={handleBlur}  placeholder='Your Name'/>}
        <br/>
        <input type="text" name='email' onBlur={handleBlur} placeholder='Your Email' required/>
        <br/>
        <input type="password" name='password' onBlur={handleBlur} placeholder='Your Password' required/>
        <br/>
        <button type="submit">{newUser ? "Sign Up" : 'LogIn'}</button>
      </form>
        <br/>
      <button onClick={() => resetPassword(user.email)}>Reset Password</button>
      
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color:'green'}}>User {newUser ? "Created" : "Logged In"} Successfully</p>}
    </div>
  );
}

export default Login;
