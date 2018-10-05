import React, { Component } from 'react'
//import logo from './logo.svg';
//import './Login.css';
import firebase from 'firebase/app'
import 'firebase/auth'
import fetch from 'isomorphic-fetch'
import './Login.css'
import googleLogo from '../google.ico';
import ModalLogin from './ModalLogin'
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react'

const config = {
  apiKey: "AIzaSyCJVOXUyP9bMysoDBpqN5nDbV9yQPLq3i4",
  authDomain: "sellyourstuff-b27b2.firebaseapp.com",
  databaseURL: "https://sellyourstuff-b27b2.firebaseio.com",
  storageBucket: "sellyourstuff-b27b2.appspot.com",
};

const google = new firebase.auth.GoogleAuthProvider();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }
  componentDidMount() {
    firebase.initializeApp(config);
    firebase.auth().useDeviceLanguage();
  }
  showState = () => {
    console.log(this.state)
  }
  loginWithGoogle() {
    firebase.auth().signInWithPopup(google).then(result => {
      console.log(result);
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      let myUser = result.additionalUserInfo.profile;
      // ...
      this.setState({ token: token, user: myUser }, this.showState)
    }).then((success) => {
      var user = JSON.stringify(this.state.user);
      console.log('this is the user parameter: ' + user)
      fetch('http://localhost:3000/api/signUp/true', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: user
      }).then(res => {
        console.log('Lyckades skicka req till API:et och kontrollera att user redan finns eller signa upp ny user:' + res);
        this.setState({ isLoggedIn: true }, this.showState)
      }).catch(err => {
        console.log(err)
      })
      this.setState({ isLoggedIn: true }, this.showState)
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...

      this.setState({ credential: error.credential, errorCode: error.code, errorMessage: error.message, isLoggedIn: false },
        this.showState
      )
    });
  }
  logoutWithGoogle() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.setState({ isLoggedIn: false, token: undefined, user: undefined },
        this.showState
      )

    }).catch(error => {
      // An error happened.
      this.setState({ credential: error.credential, email: error.email, errorCode: error.code, errorMessage: error.message, isLoggedIn: true })
    });
  }
  render() {
    const isLoggedIn = !this.state.isLoggedIn ? (
      <div className="logMe">
        <Modal size="mini" dimmer="blurring" trigger={<button id="triggerButton">Log In</button>} closeIcon>
          <Modal.Header style={{fontSize:"1.3em"}}>Select a Login Alternative</Modal.Header>
          <Modal.Content style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <button type="button" id="loginButton" onClick={() => { this.loginWithGoogle() }}><img src={googleLogo}/>Log in with Google</button>
          </Modal.Content>
        </Modal>
      </div>
    ) : (
        <div className="logMe">
          <h2>You are logged in, {this.state.user.name}</h2>
          <button id="logout" onClick={() => { this.logoutWithGoogle() }}>Log out</button>
        </div>
      )
    return (
      <div id="login">
        {isLoggedIn}
      </div>
    );
  }
}

export default Login;
