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
      priceRange:{}
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
    this.getUser()
  }

  changeToShop = () => this.setState({ currentTab: "shop" })

  getUser = () => {
    let id = this.state.user.id;
    let urlFetch = "http://localhost:3000/api/users/"+ id;
    fetch( urlFetch,
      {  method: 'GET' })
      .then(res => { return res.json() })
      .then(data => {  this.setUserData(data) } )
      .catch(err => { console.log("Error is" , err) })
  };
  //här vill jag spara user data från databasen för att skiska till Profile.js
  setUserData = (recivedData) => {
    this.setState({user: recivedData});
    console.log(this.state.user);
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
      this.setState({ max: data.max, min: data.min, priceRange:{myMin: data.min, myMax: data.max} }, () => {
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
    console.log("filterMeBabyCalled")
    console.log(category, priceRange)
    console.log(priceRange.myMin)
    let q, min, max;
    if((priceRange.myMin == this.state.min && priceRange.myMax == this.state.max) ||
    typeof priceRange.myMin != 'number' || typeof priceRange.myMax != 'number' ){
      if (category == 'all') this.getInitialProducts();
      else q = ''
    } else {
      min = priceRange.myMin;
      max = priceRange.myMax;
      q = '?myMin='+min+'&myMax='+max;
    }
    console.log("q = " + q)
    fetch('http://localhost:3000/api/filter/' + category + 
    q, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(response => {
      console.log(response)
      return response.json()
    }).then(data => {
      console.log(data)
      this.setState({ products: data });
    }).catch(err => {
      console.log(err);
    })
  }
  // use function add filter, the filterMeBaby[...] is just a callback. It's called inside addFilter
  addCategory = (category) => {
    this.setState({ category: category }, 
      this.filterMeBabyOhYeahFilterMePlease(category, this.state.priceRange)
  )
  }
  addPrice = (price) => {
    this.setState({ priceRange: price })
    this.filterMeBabyOhYeahFilterMePlease(this.state.category, price)
  }
  // filter funktion tar ett filter-objekt som parameter t.ex.: 
  // {category: "furniture"}


  componentDidMount() {
    this.aggregateMaxAndMin();
    this.getInitialProducts();
  }
  render() {
    const loggedIn = !this.state.user ? (
        null
    ) : (
        <Profile user={this.state.user}/>
    )
    let currentApp = null;
    if (this.state.currentTab === "shop") {
      currentApp = <ProductList productsProp={this.state.products} minRange={this.state.min} maxRange={this.state.max} addCategory={this.addCategory} addPrice={this.addPrice} category={this.state.category}/>
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
