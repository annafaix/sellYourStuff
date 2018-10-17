import React, { Component } from 'react';
import { Image, Button, Header, Modal } from 'semantic-ui-react'

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
      <div>
        <Modal.Header>{this.props.product.name}</Modal.Header>
        <Modal.Content image>
        <Image wrapped size='medium' src={this.props.product.userPicture} />
            <Modal.Description>
              <Header>Listed by: {this.props.product.userName}</Header>
              <p>{this.props.product.info}</p>
              <p>{this.props.product.price} Rupees</p>
              <Button onClick={this.compRemoveFromCart} color="red"> Delete </Button>
              </Modal.Description>
            </Modal.Content>
        </div>
    );
  }
}

export default cartItem;
