import React, { Component } from 'react';
import {Card, Icon, Image, Button, Header, Modal } from 'semantic-ui-react'

class productItem extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  addProductToCart = () => {
    this.props.addToCart(this.props.product)
  }

  render() {
    return (
      <div>
        <Modal trigger={<Button>Info</Button>}>
          <Modal.Header>{this.props.product.name}</Modal.Header>
          <Modal.Content image>
          <Image wrapped size='medium' src={this.props.product.userPicture} />
              <Modal.Description>
                <Header>Listed by: {this.props.product.userName}</Header>
                <p>{this.props.product.info}</p>
                <p>{this.props.product.price} Rupees</p>
                <Modal.Actions>
                <Button onClick={this.addProductToCart} color="green"> Buy </Button>
                </Modal.Actions>
              </Modal.Description>
            </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default productItem;
