import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import ProductList from './components/productList.js'
import firebase from 'firebase'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: "login",

    }
  }
  componentDidMount(){
    console.log("component")
    fetch('http://localhost:3000/mock', {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin' : '*'
      }
    })
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(json => {
      console.log(json)
    })
  }
  render() {
    let currentApp = null;
    if(this.state.currentPage === "login"){
      currentApp = <Login/>
    }
    else if(this.state.currentPage === "shop"){
      currentApp = <ProductList/>
    }
    console.log(currentApp)
    return (
      <div className="App">
        <main className="mainView">
          {currentApp}
        </main>
      </div>
    );
  }
}

export default App;
