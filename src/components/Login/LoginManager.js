import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fireConfig';

export const initializeLoginFrameWork = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
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
        success: true
      }
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

   export const createWithEmailAndPassword = (name,password,email) =>{
      return  firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(res =>{
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
         updateUserInfo(name);
         return newUserInfo;
      })
      .catch(error =>  {
        const newUserInfo = {};
        newUserInfo.success =  false;
        newUserInfo.error = error.message;
        return newUserInfo;
      });
    }

    export  const signInWithEmailAndPassword = (email,password) => {
       return firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          // console.log(res);
          return newUserInfo;
        })
        .catch(function(error) {
          const newUserInfo = {};
          newUserInfo.success =  false;
          newUserInfo.error = error.Message;
          return newUserInfo;
          // ...
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