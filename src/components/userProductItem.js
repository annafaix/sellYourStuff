import React, { Component } from 'react';
import {Card, Icon, Image, Button } from 'semantic-ui-react'
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
        <Card >
          <Image src={this.props.userPicture} style={{height:"250px"}}/>
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
            <Icon name='rupee' />
              {this.props.price} Rupees
            <br/>
            <span> Category: {this.props.category}</span>
            <div className='ui two buttons' style={{marginTop:"20px"}} >
             <Button basic color='green'>
               Edit
             </Button>
             <Button basic color='red'>
               Delete
             </Button>
           </div>
          </Card.Content>
        </Card>
    );
  }
}

export default userProdItem;
