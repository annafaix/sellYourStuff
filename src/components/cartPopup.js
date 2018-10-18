import React, { Component } from 'react';
import {Button, Icon, Card } from 'semantic-ui-react'
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
      this.props.getProducts()
    })
    this.props.emptyCart()
  }
  render() {
    let cart = this.props.cart;
    if(cart.length === 0 ){
      return <h1>Your shopping basket is empty</h1>;
    }
    let cartRender = cart.map((item, i) => {
      return <CartItem key={i} id={item._id} product={item}  deleteCart={this.props.deleteCart}/>
    })
    return (
      <div style={{padding:"10px"}}>
        <h1>My shopping basket</h1>
        <Card.Group className="ui stackable cards">
          {cartRender}
          </Card.Group>
          <Button onClick={this.buyFromDB} primary floated="right" style={{marginTop:"20px", marginBottom:"30px"}}>
            <Icon name='payment' />
            Finalize purchase
          </Button>
      </div>
    );
  }
}

export default cartPopup;
