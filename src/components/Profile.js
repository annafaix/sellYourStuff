import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import defaultUser from '../defaultUser.jpg'

export default class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      imgSrc: defaultUser,
    }

  }
  render(){
    return(
      <div className="profile">
        <Image src={this.props.user.picture}
        alt="profile picture" size="small" circular/>
        <h2>Hello {this.props.user.given_name}</h2>
        <p>{this.props.user.email}</p>
        <p>Your stuff to sell:
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </p>
      </div>
    )
  }
}
