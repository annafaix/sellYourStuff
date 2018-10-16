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
      currentTab: "landing",
      products: [],
      shoppingCart: [],
      searchResults: [],
      max: Number,
      min: Number,
      category: 'all',
      priceRange: {},
      loaded: false,
      loaded2: false
    }
    this.tabClick = this.tabClick.bind(this);
  }
  tabClick(ind) {
    console.log('Tab clicked: ' + ind);
    this.setState({ currentTab: ind });
  }
  setUserState = (user, credentials) => {
    this.setState({ user: user, credentials: credentials });
  }
  isLoggedIn = (bool) => {
    this.setState({ isLoggedIn: bool, currentTab: "shop" })
    this.getUser()
  }

  changeToShop = () => this.setState({ currentTab: "shop" })

  getUser = () => {
    let id = this.state.user.id;
    let urlFetch = "http://localhost:3000/api/users/" + id;
    fetch(urlFetch,
      { method: 'GET' })
      .then(res => { return res.json() })
      .then(data => { this.setUserData(data) })
      .catch(err => { console.log("Error is", err) })
  };
  //här vill jag spara user data från databasen för att skicka till Profile.js
  setUserData = (recivedData) => {
    this.setState({ user: recivedData });
    // console.log(this.state.user);
  }

  emptyShoppingCart = () => {
    this.setState({
      shoppingCart: [],
    })
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
      this.setState({ max: data.max, min: data.min, priceRange: { myMin: data.min, myMax: data.max }, loaded: true }, () => {
        console.log('state:', this.state);
      });
    }).catch(err => {
      console.log(err);
    })
  }

  addToCart = (boughtItem) => {
    console.log(boughtItem)
    let newCart = this.state.shoppingCart;
    let found = false;
    newCart.forEach(x => {
      if (x.id === boughtItem.id) {
        found = true;
        console.log("Found duplicate", x, boughtItem)
      }
    })
    if (found === false) {
      newCart.push(boughtItem);
    }
    this.setState({ shoppingCart: newCart })
  }
  removeFromCart = (itemToDelete) => {
    let oldCart = this.state.shoppingCart
    let newCart = (this.state.shoppingCart).filter(x => x.id !== itemToDelete.id)
    this.setState({ shoppingCart: newCart })
    console.log(itemToDelete)

  }
  updateLoadState = () => {
    this.setState({loaded2: true})
  }
  getInitialProducts = () => {
    console.log("Inside component")
    let req = new XMLHttpRequest();
    req.onreadystatechange = (event) => {
      if (req.readyState == 4) {
        this.setState({ products: JSON.parse(req.response) }, this.updateLoadState);
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
    // console.log("filterMeBabyCalled")
    console.log(category, priceRange)
    console.log(priceRange.myMin)
    let q, min, max;
    if ((priceRange.myMin == this.state.min && priceRange.myMax == this.state.max) ||
      typeof priceRange.myMin != 'number' || typeof priceRange.myMax != 'number') {
      if (category == 'all') this.getInitialProducts();
      else q = ''
    } else {
      min = priceRange.myMin;
      max = priceRange.myMax;
      q = '?myMin=' + min + '&myMax=' + max;
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


  async componentDidMount() {
    await this.aggregateMaxAndMin();
    await this.getInitialProducts();
  }
  render() {
    const loggedIn = !this.state.user ? (
      null
    ) : (
        <Profile user={this.state.user} getUser={this.getUser} />
      )
    const landingPage = (this.state.currentTab == "landing" && !this.state.isLoggedIn) ? (
      <LandingPage changeToShop={this.changeToShop} />
    ) : null;

    let currentApp = null;
    if (this.state.currentTab === "shop") {
      currentApp =
        <ProductList productsProp={this.state.products} minRange={this.state.min} maxRange={this.state.max} addCategory={this.addCategory} addPrice={this.addPrice} category={this.state.category} cartFunction={this.addToCart} />

    }
    return (
      <div className="App">
        {this.state.loaded && this.state.loaded2 ? (
          <div>
            <Menu setUser={this.setUserState}
              isLoggedIn={this.isLoggedIn}
              clickEvent={this.tabClick}
              chosenTab={this.state.currentTab}
              cart={this.state.shoppingCart}
              deleteCart={this.removeFromCart}
              emptyCart={this.emptyShoppingCart} />

            <main className="mainView">
              <div id="landingPage" className={((this.state.currentTab === "landing") && (this.state.isLoggedIn === false)) ? "show" : "hide"}>
                {landingPage}
              </div>
              <div id="productsPage" className={(this.state.currentTab === "shop") ? "show" : "hide"}>
                {currentApp}
              </div>
              <div id="profilePage" className={((this.state.currentTab === "profile") && (this.state.isLoggedIn === true)) ? "show" : "hide"}>
                {loggedIn}
              </div>
            </main>
          </div>) : null}
      </div>
    );
  }
}

export default App;
