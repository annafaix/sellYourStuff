import React, { Component } from 'react';
import {Card, Icon, Image, Button, Header, Modal } from 'semantic-ui-react'
import CartItem from './cartItem.js'

class cartPopup extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render() {
    let cart = this.props.cart
    let cartRender = cart.map(item => {
      return <CartItem key={item.id} product={item} deleteCart={this.props.deleteCart}/>
    })
    return (
      <div>
          <Modal.Content >
            {cartRender}
          </Modal.Content>
      </div>
    );
  }
}

export default cartPopup;
