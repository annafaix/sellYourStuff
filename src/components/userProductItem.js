import React, { Component } from 'react';
import {Card, Icon, Image, Button, Modal, Header } from 'semantic-ui-react'

class userProdItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: {
        userPicture: this.props.userPicture,
        name: this.props.name,
        userName: this.props.userName,
        userEmail: this.props.userEmail,
        info: this.props.info,
        imageName: this.props.imageName,
        id: this.props.id,
        price: this.props.price,
        category: this.props.category,
      },
      open: false,
    }
  }
  deleteProduct =(id)=> {
      fetch("http://localhost:3000/deleteItem/"+ id)
        .then(res => {  })
        .catch(error => console.error('Error:', error))
   }
  close = () => this.setState({ open: false })
  closeConfigShow = () => {this.setState({ open: true }) }

  render() {
    let objectSendToEdit = {
      userPicture: this.props.userPicture,
      name: this.props.name,
      userName: this.props.userName,
      userEmail: this.props.userEmail,
      info: this.props.info,
      imageName: this.props.imageName,
      id: this.props.id,
      price: this.props.price,
      category: this.props.category,
    }
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
             <Button inverted color='green' onClick={ () => this.props.editInformation(objectSendToEdit)}>
               Edit
             </Button>
             <Modal
              open={this.state.open}
              onClose={this.close}
              trigger={  <Button inverted color='red' onClick={()=> this.closeConfigShow()}> Delete </Button> } closeIcon>
                <Header icon='trash' content='Do you really want to delete this product?' />
                <Modal.Content>
                <p> {this.props.name} will be deleted from database.</p>
              </Modal.Content>
              <Modal.Actions>
              <Button color='red' onClick={()=> this.close()}> No </Button>
              <Button color='green' onClick={()=> this.deleteProduct(this.props.id)}>
                  <Icon name='trash' /> Yes
              </Button>
              </Modal.Actions>
              </Modal>
           </div>
          </Card.Content>
        </Card>
    );
  }
}

export default userProdItem;
