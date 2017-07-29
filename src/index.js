import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todo from './components/todo';
import firebase from 'firebase'


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC8Y3AmxVZ7BRkAdPyNVpFHSatP-WSN770",
    authDomain: "react-todo-62438.firebaseapp.com",
    databaseURL: "https://react-todo-62438.firebaseio.com",
    projectId: "react-todo-62438",
    storageBucket: "",
    messagingSenderId: "804789350599"
  };
  firebase.initializeApp(config);


var TaskList = ["Task 1","Task 2","Task 3"];
ReactDOM.render(
<Todo tasks={TaskList}/>
, document.getElementById('root'));

