import React, { Component } from 'react';
import {Button,Modal, Icon } from 'semantic-ui-react'
import CartItem from './cartItem.js'
import fetch from 'isomorphic-fetch'

class cartPopup extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  buyFromDB = () => {
    // move up and make shoppingcart state null
    fetch('http://localhost:3000/api/buy',{
      method: 'POST',
      body: JSON.stringify(this.props.cart)
    }).then(data => {
      return data.json()
    }).then(json => {
    })
    this.props.emptyCart()
  }
  render() {
    let cart = this.props.cart
    let cartRender = cart.map(item => {
      return <CartItem key={item.id} product={item} deleteCart={this.props.deleteCart}/>
    })
    return (
      <div style={{height:"40%"}}>
          <Modal.Content >
            {cartRender}
          </Modal.Content>
          <Button onClick={this.buyFromDB} primary floated="right">
          <Icon disabled name='payment' />
          Finalize purchase
          </Button>
      </div>
    );
  }
}

export default cartPopup;
