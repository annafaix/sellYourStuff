import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import ProductList from './components/productList.js'
import Menu from './components/MenuHeader'
// import firebase from 'firebase'
import Profile from './components/Profile'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      currentTab: "login",
      products: [],
      shoppingCart: [],
    }
    this.tabClick = this.tabClick.bind(this);
  }
  tabClick(ind) {
    console.log('Tab clicked: ' + ind);
    this.setState({currentTab: ind});
  }
  setUserState = (user,credentials) => this.setState({user: user, credentials: credentials})
  isLoggedIn = (bool) => this.setState({isLoggedIn: bool})
  changeToShop = () => this.setState({currentTab: "shop"})
  addToCart = (boughtItem) => {
    console.log(boughtItem)
    let newCart = this.state.shoppingCart;
    let found = false;
    newCart.forEach(x => {
      if(x.id === boughtItem.id){
        found = true;
        console.log("Found duplicate", x, boughtItem)
      }
    })
    if (found === false){
      newCart.push(boughtItem);
    }
    this.setState({shoppingCart: newCart})
  }
  removeFromCart = (itemToDelete) => {
    let oldCart = this.state.shoppingCart
    let newCart = (this.state.shoppingCart).filter(x => x.id !== itemToDelete.id)
    this.setState({shoppingCart: newCart})
    console.log(itemToDelete)

  }
  componentDidMount(){
    console.log("Inside component")
    let req = new XMLHttpRequest();
    req.onreadystatechange = (event) => {
    if( req.readyState == 4){
      console.log(req.response)
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
      <div>
        <h2>You are logged in, {this.state.user.name}</h2>
        <Profile user={this.state.user}/>
      </div>
    )
    let currentApp = null;
    if(this.state.currentTab === "shop"){
      currentApp = <ProductList productsProp = {this.state.products} cartFunction={this.addToCart}/>
    }
    return (
      <div className="App">
        <Menu setUser={this.setUserState}
              isLoggedIn={this.isLoggedIn}
              showProfile={this.state.isLoggedIn}
              clickEvent={this.tabClick}
              cart={this.state.shoppingCart}
              deleteCart={this.removeFromCart}/>

        <main className="mainView">
          {currentApp}
          <button onClick={this.changeToShop}> Change to shop </button>
            {loggedIn}
            <div id="productsPage" className={((this.state.currentTab==="products") || (this.state.isLoggedIn===false)) ? "show" : "hide"}>
            products page
            </div>
            <div id="profilePage" className={((this.state.currentTab==="profile") && (this.state.isLoggedIn===true)) ? "show" : "hide"}>
              profile page
            </div>
            <div id="cartPage" className={((this.state.currentTab==="cart") && (this.state.isLoggedIn===true)) ? "show" : "hide"}>
              shopping cart page
            </div>
        </main>
      </div>
    );
  }
}

export default App;
