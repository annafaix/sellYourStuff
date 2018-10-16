import React, { Component } from 'react';
import {Card, Icon, Image } from 'semantic-ui-react'
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
      <div>
        <Card>
          <Image src={this.props.userPicture}/>
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
            <a href="/">
              <Icon name='user' />
              {this.props.price} Rupees
            </a>
            <br/>
            <span> Category: {this.props.category}</span>
            <button onClick={this.addProductToCart}> Buy </button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default productItem;
