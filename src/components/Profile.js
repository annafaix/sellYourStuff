import React, { Component } from 'react'
import { Image, Button, Icon, Divider, Form, TextArea } from 'semantic-ui-react'
import defaultUser from '../defaultUser.jpg'
import fetch from 'isomorphic-fetch'

export default class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
    imgSrc: defaultUser,
    openEdit: false,
    editAbout: "We would like to know you better. Write something about you!",
    }
  }

  handleEdit = ()=> {
    let changeAbout= !this.state.openEdit;
    this.setState({openEdit: changeAbout});
    console.log(this.props.user.id);
  }

  render(){
    return(
      <React.Fragment>
      <div className="ui raised card centered fluid" style={{width: "90%"}}>
        <div className="content profile">
        <Image src={this.props.user.picture}
        alt="profile picture" size="small" circular/>
        <h2>{this.props.user.name}</h2>
        <div className="divider"></div>
        <p>{this.props.user.email}</p>
        <p id="about me">About me:
        </p>
        {this.state.editAbout}
        {this.state.openEdit ? (
          <Form>
            <TextArea
              name='aboutMe'
              placeholder={this.state.editAbout}
              onChange={event => this.setState({editAbout: event.target.value}) }>
              </TextArea>
          </Form>

        ): null}
        <Button content="Edit" icon="edit" floated='right' onClick={() => this.handleEdit()}/>
      </div>
    </div>
    <Button color='green'>
      <Icon name="plus"/> Create new item
    </Button>

    <h2>Your stuff to sell:</h2>
  </React.Fragment>
    )
  }
}
