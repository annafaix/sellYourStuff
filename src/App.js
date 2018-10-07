import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Menu from './components/MenuHeader'
// import firebase from 'firebase'
import Profile from './components/Profile'

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
      <div>
        <h2>You are logged in, {this.state.user.name}</h2>
        <Profile user={this.state.user}/>
      </div>
    )
    return (
      <div className="App">
        <Menu setUser={this.setUserState}
              isLoggedIn={this.isLoggedIn}
              showProfile={this.state.isLoggedIn}/>
        <main className="mainView">
            {loggedIn}
        </main>
      </div>
    );
  }
}

export default App;
