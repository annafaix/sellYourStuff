import React, { Component } from 'react';
import {Card, Icon, Image, Button } from 'semantic-ui-react'
import Popups from './productPopup.js'

class productItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: {
        userPicture: this.props.userPicture,
        name: this.props.name,
        userName: this.props.userName,
        info: this.props.info,
        id: this.props.id,
        price: this.props.price,
        category: this.props.category,
      }
    }
  }
  addProductToCart = () => {
    this.props.cartFunction(this.state.item)
  }
  render() {
    return (
        <Card>
          <Image src={this.props.userPicture} style={{height: "250px"}}/>
          <Card.Content>
            <Card.Header>{this.props.name}</Card.Header>
            <Card.Meta>
              <span className='date'>Listed by {this.props.userName}</span>
            </Card.Meta>
            <Card.Description>
              <Popups product={this.state.item} addToCart={this.props.cartFunction}/>
            </Card.Description>
          </Card.Content>
          <Card.Content >
            <span> Category: {this.props.category}</span>
            <Button color="green"   floated='right' onClick={this.addProductToCart}> Buy </Button>
            <br/>
            <Icon name='rupee' />
            {this.props.price} Rupees
          </Card.Content>
        </Card>
    );
  }
}

export default productItem;
