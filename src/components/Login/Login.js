import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fireConfig';
import { useContext } from 'react';
import { UserContext } from '../../App';
firebase.initializeApp(firebaseConfig);


function Login() {
  var provider = new firebase.auth.GoogleAuthProvider();
  const [newUser,setNewUser] =  useState(false);
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);

  const [user,setUser] = useState({
    isSignIn : false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false
  })

  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName,email,photoURL} = res.user;
      const signedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch(err =>{
      console.log(err);
    })
   
  }
  const handleSignOut = () =>{
    
    firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignIn: true,
        name: '',
        email: '',
        photoURL: '',
        
      }
      setUser(signOutUser);
    })
    .catch(err =>{
      console.log(err);
    })
    
  }
  const handleSubmit = (e) =>{

    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        const newUserInfo = {...user}
        newUserInfo.error = '';
        newUserInfo.success = true
        setUser(newUserInfo);
        updateUserInfo(user.name)
      })
      .catch(error =>  {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        const newUserInfo = {...user};
        newUserInfo.success =  false;
        newUserInfo.error = errorMessage;
        setUser(newUserInfo);
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user}
        newUserInfo.error = '';
        newUserInfo.success = true
        setUser(newUserInfo)
        setLoggedInUser(newUserInfo);
        console.log(res);
      })
      .catch(function(error) {
        const newUserInfo = {...user};
        newUserInfo.success =  false;
        newUserInfo.error = error.Message;
        setUser(newUserInfo);
        // ...
      });
    }
    e.preventDefault();
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
        const email = e.target.value;
        isFieldValid = /\S+@\S+\.\S+/.test(email);
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

  const updateUserInfo = name =>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(() => {
      console.log('User update successfully');
    }).catch(error => {
      console.log(error);
    });
  }
  
  return (
    <div className="App">
      { 
        user.isSignIn ?<button onClick={handleSignOut}>Sign Out</button>  : <button onClick={handleSignIn}>Sign In</button>
      }
      {/* <h3>Name: {user.name}</h3>
      <h4>Email: {user.email}</h4> */}
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
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color:'green'}}>User {newUser ? "Created" : "Logged In"} Successfully</p>}
    </div>
  );
}

export default Login;
