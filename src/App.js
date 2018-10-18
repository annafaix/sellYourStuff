import React, { Component } from 'react';
import './App.css';
// import Login from './components/Login'
import ProductList from './components/productList.js'
import Menu from './components/MenuHeader'
import Profile from './components/Profile'
import LandingPage from './components/LandingPage'
import fetch from 'isomorphic-fetch'
import {Divider} from 'semantic-ui-react'
import Create from './components/CreateForm'


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
    //this.filterBySearch = this.filterBySearch.bind(this);
  }
  tabClick(ind) {
    this.setState({ currentTab: ind });
  }

  //filterBySearch(result) {
  //console.log('Searched product result: ' + result.name);
  //this.setState({ products: result });
  //}

  filterBySearch = (result) => {
    //console.log("Result from search " + result[0].name);
    this.setState({ products: result });
  }

  setUserState = (user, credentials) => {
    this.setState({ user: user, credentials: credentials });
  }
  isLoggedIn = (bool) => {
    this.setState({ isLoggedIn: bool, currentTab: "shop" })
    this.getUser()
  }
  updateState = (productList) => {
    this.setState({ products: productList })
  }

  changeToShop = () => this.setState({ currentTab: "shop" })

  getUser = () => {
    let id = this.state.user.id;
    let urlFetch = "http://localhost:3000/api/users/" + id;
    fetch(urlFetch,
      { method: 'GET' })
      .then(res => { return res.json() })
      .then(data => { this.setState({ user: data }) })
      .catch(err => { console.log("Error is", err) })
  };
  //här vill jag spara user data från databasen för att skicka till Profile.js
  setUserData = (recivedData) => {
    this.setState({ user: recivedData });
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
      });
    }).catch(err => {
      console.log(err);
    })
  }

  addToCart = (boughtItem) => {
    let newCart = this.state.shoppingCart;
    let found = false;
    newCart.forEach(x => {
      if (x.id === boughtItem.id || x.id === boughtItem._id) {
        found = true;
      }
    })
    if (found === false) {
      let newItem = boughtItem
      newItem.id = boughtItem._id;
      newCart.push(newItem);
    }
    this.setState({ shoppingCart: newCart })
  }
  removeFromCart = (itemToDelete) => {
    console.log(itemToDelete)
    let newCart = (this.state.shoppingCart).filter(x => x.id !== itemToDelete.id)
    this.setState({ shoppingCart: newCart })

  }
  updateLoadState = () => {
    this.setState({ loaded2: true })
  }
  getInitialProducts = () => {
    fetch('http://localhost:3000/api/products/', {
            method: 'GET',
            headers: {
              "Access-Control-Allow-Origin": "*",
            }
          }).then(response => {
            return response.json()
          }).then(data => {
            this.setState({ products: data }, this.updateLoadState);
          }).catch(err => {
            console.log(err);
          })

    // Problematic old-AJAX
    /*
    let req = new XMLHttpRequest();
    req.onreadystatechange = (event) => {
      if (req.readyState === 4) {
        this.setState({ products: JSON.parse(req.response) }, this.updateLoadState);
      }
      else {
        // console.log(req.status)
      }
    }
    req.open('GET', 'http://localhost:3000/api/products');
    req.send();*/
  }

  filterMeBabyOhYeahFilterMePlease = (category, priceRange) => {
    let q, min, max;
    if ((priceRange.myMin === this.state.min && priceRange.myMax === this.state.max) ||
      typeof priceRange.myMin != 'number' || typeof priceRange.myMax != 'number') {
      if (category === 'all') {
        fetch('http://localhost:3000/api/products/', {
            method: 'GET',
            headers: {
              "Access-Control-Allow-Origin": "*",
            }
          }).then(response => {
            return response.json()
          }).then(data => {
            this.setState({ products: data });
          }).catch(err => {
            console.log(err);
          })
       }
      else {
        q = '';
        fetch('http://localhost:3000/api/filter/' + category +
          q, {
            method: 'GET',
            headers: {
              "Access-Control-Allow-Origin": "*",
            }
          }).then(response => {
            return response.json()
          }).then(data => {
            this.setState({ products: data });
          }).catch(err => {
            console.log(err);
          })
      }
    } else {
      min = priceRange.myMin;
      max = priceRange.myMax;
      q = '?myMin=' + min + '&myMax=' + max;

      fetch('http://localhost:3000/api/filter/' + category +
        q, {
          method: 'GET',
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        }).then(response => {
          return response.json()
        }).then(data => {
          this.setState({ products: data });
        }).catch(err => {
          console.log(err);
        })
    }
  }
  // use function add filter, the filterMeBaby[...] is just a callback. It's called inside addFilter
  addCategory = (category) => {
    let callback = () => {
      this.filterMeBabyOhYeahFilterMePlease(category, this.state.priceRange)
    }
    this.setState({ category: category },
      callback
    )
  }
  addPrice = (price) => {
    let callback = () => {
      this.filterMeBabyOhYeahFilterMePlease(this.state.category, price)
    }
    this.setState({ priceRange: price },
      callback
      )
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
       <Profile tabClick={this.tabClick} user={this.state.user} />
      )

    const sayWelcome = !this.state.isLoggedIn ? (
      null
    ) : (
        <div style={{ textAlign: "center", marginBottom: "20px", marginLeft: "50px", marginRight: "50px" }} >
          <h1> Welcome {this.state.user.given_name}! </h1>
          <Divider />
        </div>
        )
    const landingPage = (this.state.currentTab === "landing" && !this.state.isLoggedIn) ? (
      <LandingPage changeToShop={this.changeToShop} />
    ) : (null);

    let currentApp = null;
    if (this.state.currentTab === "shop") {
      currentApp =
        <ProductList productsProp={this.state.products}
          minRange={this.state.min} maxRange={this.state.max}
          addCategory={this.addCategory} addPrice={this.addPrice}
          category={this.state.category} cartFunction={this.addToCart}
          filterBySearch={this.filterBySearch} updateState={this.updateState} />

    }

    const createFormPage = !this.state.user ? (null) : (<Create tabClick={this.tabClick} userProps={this.state.user} getProducts={this.getInitialProducts}/>);

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
              emptyCart={this.emptyShoppingCart}
              getInitialProducts={this.getInitialProducts} />

            <main className="mainView">
              <div id="landingPage" className={((this.state.currentTab === "landing") && (this.state.isLoggedIn === false)) ? "show" : "hide"}>
                {landingPage}
              </div>
              <div id="productsPage" className={(this.state.currentTab === "shop") ? "show" : "hide"}>
                {sayWelcome}
                {currentApp}
              </div>
              <div id="profilePage" className={((this.state.currentTab === "profile") && (this.state.isLoggedIn === true)) ? "show" : "hide"}>
                {loggedIn}
              </div>
              <div id="createPage" className={((this.state.currentTab === "create") && (this.state.isLoggedIn === true)) ? "show" : "hide"}>
                {createFormPage}
              </div>
            </main>
          </div>) : null}
      </div>
    );
  }
}

export default App;
