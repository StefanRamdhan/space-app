//1. npm start
//2. npm run-script build

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'

  var firebaseConfig = {
  apiKey: "AIzaSyCXjZiyDhCfhmQsglySiekzF7Z9GEmW-rE",
  authDomain: "starapp-9067d.firebaseapp.com",
  databaseURL: "https://starapp-9067d.firebaseio.com",
  projectId: "starapp-9067d",
  storageBucket: "starapp-9067d.appspot.com",
  messagingSenderId: "835573996153",
  appId: "1:835573996153:web:854efa654f22146b9ad2a8",
  measurementId: "G-S3829SZYCZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();