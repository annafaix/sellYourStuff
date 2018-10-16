import React, { Component } from 'react';
import {Card, Icon, Image } from 'semantic-ui-react'
import Popups from './productPopup.js'

class userProdItem extends Component {
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
              {this.props.info}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <a>
              <Icon name='user' />
              {this.props.price} Rupees
            </a>
            <br/>
            <span> Category: {this.props.category}</span>
            <button> Edit </button>
            <button> Delete </button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default userProdItem;
