import React, { Component } from 'react'
import { Image, Button, Icon, Form, TextArea } from 'semantic-ui-react'
import fetch from 'isomorphic-fetch'

export default class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
    openEdit: false,
    editAbout: "We would like to know you better. Write something about you!",
    }
  }

  openEdit = ()=> {
    let changeAbout= !this.state.openEdit;
    this.setState({openEdit: changeAbout});
  }
  closeEdit = ()=> {
    let changeAbout= !this.state.openEdit;
    this.setState({openEdit: changeAbout});
  }

  getUser = () => {
    let id = this.props.user.id;
    let urlFetch = "http://localhost:3000/api/users/"+ id;
    fetch( urlFetch,
      {  method: 'GET' })
      .then(res => { return res.json() })
      .then(data => { this.getUserData(data) })
      .catch(err => { console.log("Error is" , err) })
  };

  getUserData = (recivedData) => {
    let body = (recivedData.about =  this.state.editAbout);
    this.setState({userId:recivedData["_id"], userUpdate: recivedData })
  }

  updateUserInfo = () => {
    let id = this.state.userId;
    console.log(this.state.editAbout);
    let body = this.state.userUpdate;
    console.log("what am I ", body);
    let urlFetch = "http://localhost:3000/api/user/"+ id;
    fetch( urlFetch,
      { method: 'PUT',
      body: body })
      .then(res => {
        this.closeEdit()
        console.log(res);})
      .catch(error => console.error('Error:', error))
      .then(res => console.log('Success:', JSON.stringify(res)));
      this.closeEdit();
  }

  componentDidMount(){
    this.getUser()
  }
  render(){
    return(
      <React.Fragment>
      <div className="ui raised card centered fluid">
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
          <div>
          <Form
            style={{marginTop: "20px", width:"70%"}}>
            <TextArea
              name='aboutMe'
              placeholder={this.state.editAbout}
              onChange={event => this.setState({editAbout: event.target.value}) }>
              </TextArea>
          </Form>
          <Button content="Save"
            icon="save"
            floated='right'
            style={{marginTop:"15px"}}
            onClick={()=> this.updateUserInfo()}
           />
          </div>
        ): null}
        <Button content="Edit" icon="edit" floated='right' style={{marginTop:"15px"}} disabled={this.state.openEdit} onClick={() => this.openEdit() }/>
      </div>
    </div>
    <Button color='green' floated="right">
      <Icon name="plus"/> Create new item
    </Button>
    <h2>Your stuff to sell:</h2>
  </React.Fragment>
    )
  }
}
