import React, { Component } from 'react';
import {Card, Icon, Image, Button, Header, Modal } from 'semantic-ui-react'

class productItem extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <Modal trigger={<Button>Info</Button>}>
          <Modal.Header>{this.props.name}</Modal.Header>
          <Modal.Content image>
          <Image wrapped size='medium' src={this.props.userPicture} />
              <Modal.Description>
                <Header>Listed by: {this.props.userName}</Header>
                <p>{this.props.info}</p>
                <p>{this.props.price} Rupees</p>
                <button> Buy </button>
              </Modal.Description>
            </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default productItem;
