import React, { Component } from 'react';
import {Image, Button, Header, Modal, Card } from 'semantic-ui-react'

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
    this.props.deleteCart(this.state.item);
  }
  render() {
    return (
      <Card>
        <Image src={this.props.userPicture} style={{height: "250px"}}/>
        <Card.Content>
          <Card.Header>{this.props.product.name}</Card.Header>
          <Card.Meta>
            <span className='date'>Listed by {this.props.userName}</span>
          </Card.Meta>
          <Card.Description >
          <Header>Listed by: {this.props.product.userName}</Header>
          <p>{this.props.product.info}</p>
          <p>{this.props.product.price} Rupees</p>
          <Button onClick={this.compRemoveFromCart} color="red"> Delete </Button>

          </Card.Description>
        </Card.Content>
      </Card>

    );
  }
}

export default cartItem;
