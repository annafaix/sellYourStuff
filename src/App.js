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

    }
  }
  render() {
    return (
      <div className="App">
        <Menu/>
        <main className="mainView">

        </main>
      </div>
    );
  }
}

export default App;
