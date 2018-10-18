import React, { Component } from 'react';
import {Image, Button, Card } from 'semantic-ui-react'

class cartItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: {
        userPicture: this.props.product.userPicture,
        name: this.props.product.name,
        userName: this.props.product.userName,
        info: this.props.product.info,
        id: this.props.product.id,
        price: this.props.product.price,
        category: this.props.product.category,
      }
    }
  }
  compRemoveFromCart = () => {
    this.props.deleteCart(this.props.product);
  }
  render() {
    return (
      <Card>
        <Image src={this.props.product.userPicture} style={{height: "250px"}}/>
        <Card.Content>
          <Card.Header>{this.props.product.name}</Card.Header>
          <Card.Meta>
            <span className='date'>Listed by {this.props.product.userName}</span>
          </Card.Meta>
          <Card.Description >
          <p>{this.props.product.info}</p>
          <p>{this.props.product.price} Rupees</p>
          <Button onClick={this.compRemoveFromCart} basic fluid color="red"> Delete from shopping basket</Button>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default cartItem;
