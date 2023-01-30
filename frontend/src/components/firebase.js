import * as firebase from 'firebase';

// initializing firebase object by giving database and project reference
var firebaseConfig = {
    apiKey: "AIzaSyA53LIFELYwXqO5jseLIxTYaCodHGF6Kuw",
    authDomain: "eplant-19cd0.firebaseapp.com",
    databaseURL: "https://eplant-19cd0.firebaseio.com/",
    projectId: "eplant-19cd0",
    storageBucket: "eplant-19cd0.appspot.com",
    messagingSenderId: "641350437844",
    appId: "1:641350437844:web:0809d3e0bc22169a18e441"
  };

    firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();