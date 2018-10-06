import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'

import defaultUser from '../defaultUser.jpg'

//todo: need to get props from login.js via app.js -> lifing state

export default class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      imgSrc: defaultUser,
    }
  }
  render(){
    return(
      <div>
        <h2>Hello {this.props.user}</h2>
        <Image src={this.state.imgSrc} alt="profile picture" size="small" circular floated="left"/>
        <h3>stuff to sell</h3>
        <ul style={{listStyle: "none"}}>
          <li>lemonade</li>
          <li>lemonade</li>
        </ul>
      </div>
    )
  }
}
