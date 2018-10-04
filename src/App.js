import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCJVOXUyP9bMysoDBpqN5nDbV9yQPLq3i4",
  authDomain: "sellyourstuff-b27b2.firebaseapp.com",
  databaseURL: "https://sellyourstuff-b27b2.firebaseio.com",
  storageBucket: "sellyourstuff-b27b2.appspot.com",
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    firebase.initializeApp(config);
    fetch('http://localhost:3000/api')
    .then((data) => {
      return data.json()
    })
    .then((json) => {
      console.log(json)
    })
  }
  render() {
    return (
      <div> Main app</div>
    );
  }
}

export default App;
