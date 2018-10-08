import React, { Component } from 'react';
import './Menu.css';
import { Menu, Segment, Button, Image, Icon } from 'semantic-ui-react'
import Login from '../components/Login'

export default class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {loginStatus: false};
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  setUser = (user,credentials) => this.props.setUser(user,credentials)
  isLoggedIn(bool){
    this.props.isLoggedIn(bool);
    this.setState({ loginStatus: bool });
  }

  render() {
    const { activeItem } = this.state
    console.log("Logged in funktion" + this.isLoggedIn);
    const funcClick = this.props.clickEvent;

    return (
      <Segment inverted style={{borderRadius:'0', position:'fixed', width: '100%', top:'0', padding:'0 4rem 0 2rem', zIndex:'1'}}>
        <Menu inverted secondary style={{position:'relative'}}>
          <Menu.Item style={{verticalAlign:"text-top", position:'relative', top:'0', paddingTop:'0'}}>
            <Image src='/Logo.png' style={{width:'80px'}}/>
          </Menu.Item>

          <div id="menuInner" className={this.state.loginStatus ? 'menuInnerShow' : 'hide'}>
              <div className="products inline" onClick={() => funcClick("products")}>
                 <p className=" productsMenu inline">Products</p>
              </div>
              <div className="products inline" onClick={() => funcClick("profile")}>
                 <p className=" productsMenu inline">Profile page</p>
              </div>
              <div id="cartMenu" className="menuBtn inline" onClick={() => funcClick("cart")}>
                <p className="inline">My basket</p>
                <Icon name="cart" style={{alignSelf:'center', width:'2em', height:'2em', margin:'0'}}/>
              </div>
          </div>

          <Menu.Item position='right' style={{padding:'0', margin:'0'}}>
            <Login setUser={this.setUser} isLoggedIn={this.isLoggedIn}/>
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}
