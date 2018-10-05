import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Menu from './components/MenuHeader'
import firebase from 'firebase'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }
  setUserState = (user,credentials) => this.setState({user: user, credentials: credentials})
  isLoggedIn = (bool) => this.setState({isLoggedIn: bool})
  
  render() {
    const loggedIn = !this.state.isLoggedIn ? (
      null
    ) : (
      <h2>You are logged in, {this.state.user.name}</h2>
    )
    return (
      <div className="App">
        <Menu setUser={this.setUserState} isLoggedIn={this.isLoggedIn}/>
        <main className="mainView">
            {loggedIn}
        </main>
      </div>
    );
  }
}

export default App;
