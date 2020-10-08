import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fireConfig';

export const initializeLoginFrameWork = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

  const setUserToken = () =>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
     sessionStorage.setItem('token',idToken)
    }).catch(function(error) {
      // Handle error
    });
  }

 export const handleGoogleSignIn = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName,email,photoURL} = res.user;
      const signedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: false
      }
      setUserToken();
      return signedInUser;
    })
    .catch(err =>{
      console.log(err);
    })
   
  }
 export  const handleSignOut = () =>{
    
    return firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignIn: true,
        name: '',
        email: '',
        photoURL: '',
        
      }
      return signOutUser;
    })
    .catch(err =>{
      console.log(err);
    })
    
  }

   export const createUserWithEmailAndPassword = (name,email,password) =>{
      return firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(res =>{
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
         updateUserInfo(name);
         verifyEmail();
         return newUserInfo;
      })
      .catch(error =>  {
        const newUserInfo = {};
        newUserInfo.success =  false;
        newUserInfo.error = error.message;
        console.log(error);
        return newUserInfo;
      });
    }

    export  const signInWithEmailAndPassword = (email,password) => {
       return firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          return newUserInfo;
        })
        .catch(function(error) {
          const newUserInfo = {};
          newUserInfo.success =  false;
          newUserInfo.error = error.Message;
          return newUserInfo;
          console.log(error);
        });
      }

    export const resetPassword = email => {
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(email).then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
     }

      const verifyEmail = () =>{
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
          // Email sent.
        }).catch(function(error) {
          // An error happened.
        });
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