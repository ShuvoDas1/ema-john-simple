import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, resetPassword, signInWithEmailAndPassword } from './LoginManager';
import './login.css'


function Login() {

  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  initializeLoginFrameWork();

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false
  })


  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        setUser(res)
        setLoggedInUser(res);
        history.replace(from)
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
      })
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      console.log(user.email, user.password,newUser);
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
        })

    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
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
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }



  return (
    <div className="App mt-5 pt-3">
      {
        user.isSignIn ? <button onClick={signOut} className='btn btn-danger'>Sign Out</button> : <button onClick={googleSignIn} className='btn btn-outline-success px-lg-5 btn-rounded'>Sign In with Google</button>
      }
      <br />
      <div className='mt-3'>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} id="" />
        <h5 htmlFor="newUser" className='d-inline pl-2'>Sign Up as new user</h5>
      </div>
      <br />
      <div className="container">
        <form onSubmit={handleSubmit}>
          {newUser && <input type="text" className='form-control' name='name' onBlur={handleBlur} placeholder='Your Name' />}
          <br />
          <input type="text" name='email' className='form-control' onBlur={handleBlur} placeholder='Your Email' required />
          <br />
          <input type="password" className='form-control' name='password' onBlur={handleBlur} placeholder='Your Password' required />
          <br />
          <button className='btn btn-primary px-5'  type="submit">{newUser ? "Sign Up" : 'LogIn'}</button>
        </form>
      </div>
      <br/>
      {/* <button onClick={() => resetPassword(user.email)} className='btn btn-warning'>Reset Password</button> */}

      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? "Created" : "Logged In"} Successfully</p>}
    </div>
  );
}

export default Login;
