import React, { Component } from 'react';
import {Card, Icon, Image } from 'semantic-ui-react'

class productItem extends Component {
  constructor(props){
    super(props);
    this.state = {

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
            <Card.Description>{this.props.info}</Card.Description>
          </Card.Content>
          <Card.Content >
            <a href="/">
              <Icon name='user' />
              {this.props.price} Rupees
            </a>
            <br/>
            <span> Category: {this.props.category}</span>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default productItem;
