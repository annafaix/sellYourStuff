import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import ProductList from './components/productList.js'
import Menu from './components/MenuHeader'
import firebase from 'firebase'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      currentTab: "products"
      currentPage: "login",
      products: []
    }
    this.tabClick = this.tabClick.bind(this);
  }
  tabClick(ind) {
    console.log('Tab clicked: ' + ind);
    this.setState({currentTab: ind});
  }
  setUserState = (user,credentials) => this.setState({user: user, credentials: credentials})
  isLoggedIn = (bool) => this.setState({isLoggedIn: bool})
  changeToShop = () => this.setState({currentPage: "shop"})

  componentDidMount(){
    console.log("Inside component")
    let req = new XMLHttpRequest();
    req.onreadystatechange = (event) => {
    if( req.readyState == 4){
        this.setState({ products: JSON.parse(req.response) })
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
    const loggedIn = !this.state.isLoggedIn ? (
      null
    ) : (
      <h2>You are logged in, {this.state.user.name}</h2>
    )
    let currentApp = null;
    if(this.state.currentPage === "shop"){
      currentApp = <ProductList productsProp = {this.state.products}/>
    }
    return (
      <div className="App">
        <Menu setUser={this.setUserState} isLoggedIn={this.isLoggedIn} clickEvent={this.tabClick}/>
        <main className="mainView">
          {currentApp}
          <button onClick={this.changeToShop}> Change to shop </button>
            {loggedIn}
            <div id="productsPage" className={(this.state.currentTab==="products") ? "show" : "hide"}>
            products page
            </div>
            <div id="profilePage" className={(this.state.currentTab==="profile") ? "show" : "hide"}>
              profile page
            </div>
            <div id="cartPage" className={(this.state.currentTab==="cart") ? "show" : "hide"}>
              shopping cart page
            </div>
        </main>
      </div>
    );
  }
}

export default App;
