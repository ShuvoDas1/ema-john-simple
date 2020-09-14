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
        photo: photoURL
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

    // const createWithEmailAndPassword = () =>{
    //     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    //   .then(res =>{
    //     const newUserInfo = {...user}
    //     newUserInfo.error = '';
    //     newUserInfo.success = true
    //     setUser(newUserInfo);
    //     updateUserInfo(user.name)
    //   })
    //   .catch(error =>  {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     const newUserInfo = {...user};
    //     newUserInfo.success =  false;
    //     newUserInfo.error = errorMessage;
    //     setUser(newUserInfo);
    //   });
    // }

    //   const signInWithEmailAndPassword = () => {
    //     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    //     .then(res => {
    //       const newUserInfo = {...user}
    //       newUserInfo.error = '';
    //       newUserInfo.success = true
    //       setUser(newUserInfo)
    //       setLoggedInUser(newUserInfo);
    //       history.replace(from)
    //       // console.log(res);
    //     })
    //     .catch(function(error) {
    //       const newUserInfo = {...user};
    //       newUserInfo.success =  false;
    //       newUserInfo.error = error.Message;
    //       setUser(newUserInfo);
    //       // ...
    //     });
    //   }

    //   const updateUserInfo = name =>{
    //     var user = firebase.auth().currentUser;
    
    //     user.updateProfile({
    //       displayName: name,
    //     }).then(() => {
    //       console.log('User update successfully');
    //     }).catch(error => {
    //       console.log(error);
    //     });
    //   }