import React, { Component } from 'react'
import { Image, Button, Icon, Form, TextArea, Card } from 'semantic-ui-react'
import fetch from 'isomorphic-fetch'
import UserProdItem from './userProductItem.js'

export default class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
    user: {},
    openEdit: false,
    userProducts: [],
    disabled: true,
    editAbout: '',
    }
  }

  openEdit = ()=> {
    let changeAbout= !this.state.openEdit;
    this.setState({openEdit: changeAbout});
  }
  closeEdit = ()=> {
    let changeAbout= !this.state.openEdit;
    this.setState({openEdit: changeAbout})
  }

  updateUserInfo = () => {
    let id = this.props.user._id;
    let body = this.state.editAbout;
    console.log(body);
    let urlFetch = "http://localhost:3000/api/user/"+ id;
    fetch( urlFetch,
      { method: 'PUT',
      body: body })
      .then(res => { console.log(res) })
      .catch(error => console.error('Error:', error))
      this.closeEdit();
  }

  fetchUsersProd = () => {
    fetch('http://localhost:3000/api/userProducts/' + this.props.user.name)
    .then(response => {
      return response.json()
    })
    .then(json => {
      this.setState({userProducts: json})
    })
  }

  componentDidMount() {
    this.fetchUsersProd();
  }

  render(){
    let userProductArray = null;
    if(this.state.userProducts === []){
      userProductArray = "Empty"
    }
    else {
      let allProducts = this.state.userProducts
      userProductArray = allProducts.map(item => {
        return <UserProdItem name={item.name}
                  key={item._id}
                  id={item._id}
                  userName={item.userName}
                  info={item.info}
                  userPicture={item.userPicture}
                  price={item.price}
                  category={item.category}/>

      })
    }
    return(
      <React.Fragment>
      <div>
      <div className="ui raised card centered fluid" style={{backgroundColor:"F4F4F4"}}>
        <div className="content profile">
        <Image src={this.props.user.picture}
        alt="profile picture" size="small" circular/>
        <h2>{this.props.user.name}</h2>
        <div className="divider"></div>
        <p>{this.props.user.email}</p>
        <p id="about me">About me:
        </p> State: {this.state.editAbout} Props:{this.props.user.about}
        <Button content="Edit" icon="edit" floated='right' style={{marginTop:"15px"}}
        disabled={this.state.openEdit}
        onClick={() => this.openEdit() }/>
        {this.state.openEdit ? (
          <div>
          <Form fluid="true">
            <TextArea style={{marginTop: "20px"}} placeholder="Tell us more about you"
              name='aboutMe'
              onChange={ (event) => {
                if(event.target.value.length >= 0){
                  this.setState({disabled: false, editAbout: event.target.value})
                }else{
                 this.setState({disabled: true})
               }
             }}>
            </TextArea>
          </Form>
          <Button content="Save"
            icon="save"
            floated='right'
            style={{marginTop:"15px"}}
            disabled={this.state.disabled}
            onClick={()=> this.updateUserInfo()}
           />
         <Button content="Close"
           icon="close"
           floated='right'
           style={{marginTop:"15px"}}
           onClick={()=> this.closeEdit()}
          />
          </div>
        ): null}
      </div>
    </div>
    <Button onClick={()=>console.log(this.props.user._id) }color='green' floated="right">
      <Icon name="plus"/> Create new item
    </Button>
    <h2>Your stuff to sell:</h2>
    <Card.Group className="ui three stackable cards" style={{width: '70%', marginBottom: '40px'}}>
      {userProductArray}
    </Card.Group>
    </div>
  </React.Fragment>
    )
  }
}
