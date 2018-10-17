import React, { Component } from 'react';
import {Card, Icon, Image, Button, Label, Header } from 'semantic-ui-react'
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
      },
      color: "green",
      content: "Buy"
    }
  }
  addProductToCart = () => {
    this.setTimeoutForBuy();
    this.props.cartFunction(this.props.item);
  }
  changeBackBtnColor =()=> {
    setTimeout(()=>this.setState({color: "green", content: "Buy"}), 3000)
  }
  setTimeoutForBuy=()=> {
    this.setState({color: "orange", content: "Added"}, this.changeBackBtnColor())
  }

  render() {
    return (
        <Card>
          <Image src={this.props.userPicture} style={{height: "250px"}}/>
          <Card.Content>
          <Label color="black" ribbon="right">
          {this.props.category}
          </Label>
            <Card.Header>{this.props.name}</Card.Header>
            <Card.Meta>
              <span className='date'>Listed by {this.props.userName}</span>
            </Card.Meta>
            <Card.Description >
              <Popups product={this.props.item} addToCart={this.props.cartFunction}/>
            </Card.Description>
          </Card.Content>
          <Card.Content >
            <Button color={this.state.color}   floated='right' onClick={this.addProductToCart}> {this.state.content} </Button>
            <br/>
            <div>
            <Header sub>Price</Header>
            <Icon name='rupee' />
            <span>{this.props.price} Rupees</span>
            </div>
          </Card.Content>
        </Card>
    );
  }
}

export default productItem;
