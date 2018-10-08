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
      products: [],

    }
  }

  componentDidMount(){
    console.log("Inside component")
    let req = new XMLHttpRequest();
    req.onreadystatechange = (event) => {
    if( req.readyState == 4){
        this.setState({ products: req.response })
        console.log(this.state.products)
    }
    else {
      console.log(req.status)
    }
  }
  req.open('GET', 'http://localhost:3000/api/products');
  req.send();
    /*fetch('http://localhost:3000/api/products', {
      method: "GET",
      header: {
        'Access-Control-Allow-Origin' : '*',
      }
    })
    .then(res => {
      console.log("Inside fetch")
      return res.json()
    })
    .then(json => {
      console.log(json)
    })*/
  }
  render() {
    let currentApp = null;
    if(this.state.currentPage === "login"){
      currentApp = <Login/>
    }
    else if(this.state.currentPage === "shop"){
      currentApp = <ProductList/>
    }
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
