import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import ProductList from './components/productList.js'
import Menu from './components/MenuHeader'
import Profile from './components/Profile'
import LandingPage from './components/LandingPage'
import fetch from 'isomorphic-fetch'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      currentTab: "login",
      products: [],
      max: Number,
      min: Number
    }
    this.tabClick = this.tabClick.bind(this);
  }
  tabClick(ind) {
    console.log('Tab clicked: ' + ind);
    this.setState({ currentTab: ind });
  }
  setUserState = (user, credentials) =>{
    this.setState({ user: user, credentials: credentials });

  }
  isLoggedIn = (bool) => {
    this.setState({ isLoggedIn: bool })
    this.getUser()}
  changeToShop = () => this.setState({ currentTab: "shop" })

  getUser = () => {
    let id = this.state.user.id;
    let urlFetch = "http://localhost:3000/api/users/"+ id;
    fetch( urlFetch,
      {  method: 'GET' })
      .then(res => { return res.json() })
      .then(data => { this.getUserData(data); this.setState({user: data}); console.log(this.state.user) })
      .catch(err => { console.log("Error is" , err) })
  };

  getUserData = (recivedData) => {
    let body = (recivedData.about =  this.state.editAbout);
    this.setState({userId:recivedData["_id"], userUpdate: recivedData })
  }


aggregateMaxAndMin = () => {
    fetch('http://localhost:3000/api/getPriceRange', {
    method: 'GET',
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }).then(response =>{
    return response.json()
  }).then(data => {
    this.setState({max: data.max, min: data.min});
  }).catch(err => {
    console.log(err);
  })
}


getInitialProducts = () => {
  console.log("Inside component")
    let req = new XMLHttpRequest();
    req.onreadystatechange = (event) => {
      if (req.readyState == 4) {
        this.setState({ products: JSON.parse(req.response)});
        console.log(this.state.products)
      }
      else {
        console.log(req.status)
      }
    }
    req.open('GET', 'http://localhost:3000/api/products');
    req.send();
}
// filter funktion tar ett filter-objekt som parameter t.ex.:
// {category: "furniture"}
filterMeBabyOhYeahFilterMePlease = filter => {
  fetch('http://localhost:3000/api/filter' + JSON.stringify(filter), {
    method: 'GET',
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }).then(response => {
    return response.json()
  }).then(data => {
    this.setState({filteredProducts: data});
  }).catch(err => {
    console.log(err);
  })
}


  componentDidMount() {
    this.aggregateMaxAndMin();
    this.getInitialProducts();
  }
  render() {
    const loggedIn = !this.state.isLoggedIn ? (
      null
    ) : (
        <Profile user={this.state.user}/>
    )
    let currentApp = null;
    if (this.state.currentTab === "shop") {
      currentApp = <ProductList productsProp={this.state.products} />
    }
    return (
      <div className="App">
        <Menu setUser={this.setUserState}
          isLoggedIn={this.isLoggedIn}
          clickEvent={this.tabClick}
          chosenTab={this.state.currentTab} />
        <main className="mainView">
          <LandingPage/>
          {currentApp}
          <button onClick={this.changeToShop}> Change to shop </button>
          <div id="productsPage" className={(this.state.currentTab === "products") ? "show" : "hide"}>
            products page
            </div>
          <div id="profilePage" className={((this.state.currentTab === "profile") && (this.state.isLoggedIn === true)) ? "show" : "hide"}>
            {loggedIn}
          </div>
          <div id="cartPage" className={((this.state.currentTab === "cart") && (this.state.isLoggedIn === true)) ? "show" : "hide"}>
            shopping cart page
            </div>
        </main>
      </div>
    );
  }
}

export default App;
