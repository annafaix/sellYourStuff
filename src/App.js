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
import EditProd from './components/EditForm'

const defaultimg = 'https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fplaceholder.png?alt=media&token=230fbf95-36cf-4508-a1bb-985511142a86';

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
      loaded2: false,

      name: '',
      price: 1,
      category: 'Other',
      userName: '',
      userEmail: '',
      imageName: '',
      userPicture: defaultimg,
      info: '',
      CurrentProductId: 0

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

  editInformation = (obj) => {
    // console.log(obj);
    this.setState({
      name: obj.name,
      price: obj.price,
      category: obj.category,
      userName: obj.userName,
      userEmail: obj.userEmail,
      imageName: obj.imageName,
      userPicture: obj.userPicture,
      info: obj.info,
      CurrentProductId: obj.id
      }, ()=>{
      console.log(this.state.CurrentProductId);
      this.tabClick('editForm')
    });
  }

  onChangeName = (value) =>{
    this.setState({name: value})
  }
  onChangeCategory = (value) =>{
    this.setState({category: value})
  }
  onChangeInfo = (value) =>{
    this.setState({info: value})
  }

  validateEditPrice = (num) =>{
    let newNum;
    if (isNaN(num)) {
      newNum = 1;
    }else {
      newNum = Number(num);
    }
    this.setState({price: newNum})
  }

  onCancelEditUpdate = () => {
    this.setState({CurrentProductId: 0},()=>{
      this.tabClick('profile');
    });
  }

  updateProductInfo = () =>{
    let id = this.state.CurrentProductId;
    let changeInfo = {
      name: this.state.name,
      price: this.state.price,
      category: this.state.category,
      info: this.state.info,
    };
    let body = JSON.stringify(changeInfo)
    let urlFetch = "http://localhost:3000/api/updateProduct/"+ id;
    fetch( urlFetch,
      { method: 'PUT',
      body: body })
      .then(res => {  })
      .catch(error => console.error('Error:', error))
      this.tabClick('profile')
  }

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
      if (x.id === boughtItem.id) {
        found = true;
      }
    })
    if (found === false) {
      newCart.push(boughtItem);
    }
    this.setState({ shoppingCart: newCart })
  }
  removeFromCart = (itemToDelete) => {
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
    console.log(this.state)
    let q, min, max;
    if ((priceRange.myMin == this.state.min && priceRange.myMax == this.state.max) ||
      typeof priceRange.myMin != 'number' || typeof priceRange.myMax != 'number') {
      if (category == 'all') {
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
       <Profile editInformation={this.editInformation} tabClick={this.tabClick} user={this.state.user} />
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

    const createFormPage = !this.state.user ? (null) : (<Create tabClick={this.tabClick} userProps={this.state.user}/>);
    const editFormPage = !this.state.user ? (null) : (
      <EditProd
          onCancelEditUpdate={this.onCancelEditUpdate}
          updateProductInfo={this.updateProductInfo}
          onChangeInfo={this.onChangeInfo}
          onChangeName={this.onChangeName}
          onChangeCategory={this.onChangeCategory}
          validateEditPrice={this.validateEditPrice}
          tabClick={this.tabClick}
          name= {this.state.name}
          price= {this.state.price}
          category= {this.state.category}
          userName= {this.state.userName}
          userEmail= {this.state.userEmail}
          imageName= {this.state.imageName}
          userPicture= {this.state.userPicture}
          info= {this.state.info}/>);

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
                {sayWelcome}
                {currentApp}
              </div>
              <div id="profilePage" className={((this.state.currentTab === "profile") && (this.state.isLoggedIn === true)) ? "show" : "hide"}>
                {loggedIn}
              </div>
              <div id="createPage" className={((this.state.currentTab === "create") && (this.state.isLoggedIn === true)) ? "show" : "hide"}>
                {createFormPage}
              </div>
              <div id="createPage" className={((this.state.currentTab === "editForm") && (this.state.isLoggedIn === true)) ? "show" : "hide"}>
                {editFormPage}
              </div>

            </main>
          </div>) : null}
      </div>
    );
  }
}

export default App;
