import React, { Component } from 'react';
import {Image, Button, Header, Modal } from 'semantic-ui-react'

class productItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      color: "green",
      content: "Buy"
    }
  }
  close = () => this.setState({ open: false })
  addProductToCart = () => {
      this.setTimeoutForBuy();
    this.props.addToCart(this.props.product)
  }
  changeBackBtnColor =()=> {
      setTimeout(()=>this.setState({color: "green", content: "Buy"}), 2000)
    }
  setTimeoutForBuy=()=> {
      this.setState({color: "orange", content: "Added"}, this.changeBackBtnColor())
    }

  render() {
    return (
        <Modal trigger={<Button compact>Info</Button>}>
          <Modal.Header>{this.props.product.name}</Modal.Header>
          <Modal.Content image>
          <Image wrapped size='medium' src={this.props.product.userPicture} />
              <Modal.Description>
                <Header>Listed by: {this.props.product.userName}</Header>
                <p>{this.props.product.info}</p>
                <p>{this.props.product.price} Rupees</p>
                <Modal.Actions>
                <Button color={this.state.color} size="large"  floated='right' onClick={this.addProductToCart}> {this.state.content} </Button>
                </Modal.Actions>
              </Modal.Description>
            </Modal.Content>
        </Modal>
    );
  }
}

export default productItem;
