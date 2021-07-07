import firebase from 'firebase/app';
import "firebase/auth";

export const auth = firebase.initializeApp ({
  apiKey: "AIzaSyB3j8-wa21GeyH0MyDVwsar5ONYAHtnLew",
  authDomain: "polychat-b50ca.firebaseapp.com",
  projectId: "polychat-b50ca",
  storageBucket: "polychat-b50ca.appspot.com",
  messagingSenderId: "533916748240",
  appId: "1:533916748240:web:3dc0fd1a713d82e11411d5"
}).auth();