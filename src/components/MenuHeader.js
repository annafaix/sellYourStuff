import React, { Component } from 'react';
import './Menu.css';
import { Menu, Segment, Button, Image, Icon, Modal } from 'semantic-ui-react'
import Login from '../components/Login'
import CartPopup from './cartPopup.js'

export default class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false,
    }
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  setUser = (user,credentials) => this.props.setUser(user,credentials)
  isLoggedIn(bool){
    this.props.isLoggedIn(bool);
    this.setState({ loginStatus: bool });
  }

  render() {
    // const { activeItem } = this.state
    const funcClick = this.props.clickEvent;
    const chosenTab = this.props.chosenTab;
    // console.log("chosenTab" + chosenTab);

    return (
      <Segment inverted style={{borderRadius:'0', position:'sticky', width: '100%', top:'0', padding:'0 4rem 0 2rem', zIndex:'5'}}>
        <Menu inverted secondary style={{position:'relative'}}>
          <Menu.Item style={{verticalAlign:"text-top", position:'relative', top:'0', paddingTop:'0'}}>
            <Image src='/Logo.png' style={{width:'130px', height:'auto'}}/>
          </Menu.Item>

          <div id="menuInner" className={this.state.loginStatus ? 'menuInnerShow' : 'hide'}>
              <div className="menuLeftWrap">
                  <div className={(chosenTab) === "products" ? 'products inline chosenMenuItem' : 'products inline'}  onClick={() => funcClick("products")}>
                    <Icon name="home" style={{alignSelf:'center', width:'2em', height:'2em', margin:'auto'}}/>
                     <p className=" productsMenu inline">Home</p>
                  </div>
                  <div className={(chosenTab) === "profile" ? 'products inline chosenMenuItem' : 'products inline'} onClick={() => funcClick("profile")}>
                     <Icon name="user" style={{alignSelf:'center', width:'2em', height:'2em', margin:'auto'}}/>
                     <p className=" productsMenu inline">Profile</p>
                  </div>
              </div>
              <div className="products inline" onClick={() => funcClick("profile")}>
                 <p className=" productsMenu inline">Profile page</p>
              </div>
              <Modal trigger={
                <div className={(chosenTab) === "cart" ? 'menuBtn inline chosenMenuItem' : 'menuBtn inline'} onClick={() => funcClick("cart")}>
                  <p className="inline"  style={{alignSelf:'center', margin:'auto'}}>My basket</p>
                  <Icon name="cart" style={{alignSelf:'center', width:'2em', height:'2em', margin:'auto'}}/>
                </div>}>
                <CartPopup cart={this.props.cart} deleteCart={this.props.deleteCart} emptyCart={this.props.emptyCart}/>
              </Modal>
          </div>
          <Menu.Item position='right' style={{padding:'0', margin:'0'}}>
            <Login setUser={this.setUser} isLoggedIn={this.isLoggedIn}/>
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}
