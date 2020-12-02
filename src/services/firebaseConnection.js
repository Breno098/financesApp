import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyApOxdU2S3rWDMa9bexKqT-CczF3qv1BXA",
    authDomain: "financesapp-bef8a.firebaseapp.com",
    databaseURL: "https://financesapp-bef8a.firebaseio.com",
    projectId: "financesapp-bef8a",
    storageBucket: "financesapp-bef8a.appspot.com",
    messagingSenderId: "1029341625428",
    appId: "1:1029341625428:web:327b8887dbe382dad001c1",
    measurementId: "G-ZVTB369TEQ"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;