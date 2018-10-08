import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Menu from './components/MenuHeader'
import firebase from 'firebase'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      currentTab: "products"
    }
    this.tabClick = this.tabClick.bind(this);
  }
  tabClick(ind) {
    console.log('Tab clicked: ' + ind);
    this.setState({currentTab: ind});
  }
  setUserState = (user,credentials) => this.setState({user: user, credentials: credentials})
  isLoggedIn = (bool) => this.setState({isLoggedIn: bool})

  render() {
    const loggedIn = !this.state.isLoggedIn ? (
      null
    ) : (
      <h2>You are logged in, {this.state.user.name}</h2>
    )
    return (
      <div className="App">
        <Menu setUser={this.setUserState} isLoggedIn={this.isLoggedIn} clickEvent={this.tabClick}/>
        <main className="mainView">
            {loggedIn}
            <div id="productsPage" className={((this.state.currentTab==="products") || (this.state.isLoggedIn===false))? "show" : "hide"}>
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
