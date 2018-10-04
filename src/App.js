import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import firebase from 'firebase'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="App">
        <main className="mainView">
          <Login/>
        </main>
      </div>
    );
  }
}

export default App;
