import React, { Component } from 'react'
import MenuHeader from './MenuHeader.js'
import { Image } from 'semantic-ui-react'

import defaultUser from '../static/defaultUser.jpg'

//we need to get props from login.js via app.js -> lifing state

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
        <MenuHeader/>
        <h2>First name: {this.props.user}</h2>
        <h2>Last name: </h2>
        <Image src={this.state.imgSrc} alt="profile picture" size="small" circular floated="left"/>
        <h3>stuff to sell</h3>
        <ul>
          <li>lemonade</li>
          <li>lemonade</li>
        </ul>
      </div>
    )
  }
}
