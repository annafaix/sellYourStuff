import React, { Component } from 'react';
import './App.css';
// import Login from './components/Login'
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
      searchResults: [],
      max: Number,
      min: Number,
      category: 'all',
      priceRange:{
        myMin: 0,
        myMax: 999
      }
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
      .then(data => { this.getUserData(data); this.setState({user: data}) })
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
    }).then(response => {
      return response.json()
    }).then(data => {
      this.setState({ max: data.max, min: data.min }, () => {
        console.log('state:', this.state);
      });
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
        // console.log(this.state.products)
      }
      else {
        // console.log(req.status)
      }
    }
    req.open('GET', 'http://localhost:3000/api/products');
    req.send();
  }

  filterMeBabyOhYeahFilterMePlease = (category, priceRange) => {
    let q;
    if((priceRange.myMin != this.state.min && priceRange.myMax != this.state.max) ||
    typeof priceRange.myMin !== Number || typeof priceRange.myMax !== Number ){
      q = '';
    } else {
      q = `?myMin=${priceRange.myMin}&myMax=${priceRange.myMax}`;
    }
    fetch('http://localhost:3000/api/filter/' + category + 
    q, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(response => {
      console.log('response: ', response)
      //return response.json()
    }).then(data => {
      console.log(data)
      this.setState({ filteredProducts: data });
    }).catch(err => {
      console.log(err);
    })
  }
  // use function add filter, the filterMeBaby[...] is just a callback. It's called inside addFilter
  addCategory = (category) => {
    this.setState({ category: category }, 
      this.filterMeBabyOhYeahFilterMePlease(this.state.category, this.state.priceRange)
  )
  }
  addPrice = (price) => {
    this.setState({ priceRange: price },
      this.filterMeBabyOhYeahFilterMePlease(this.state.category, this.state.priceRange)
  )
  }
  // filter funktion tar ett filter-objekt som parameter t.ex.: 
  // {category: "furniture"}


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
      currentApp = <ProductList productsProp={this.state.products} minRange={this.state.min} maxRange={this.state.max} addCategory={this.addCategory} addPrice={this.addPrice}/>
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
