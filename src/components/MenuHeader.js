import React, { Component } from 'react';
import './Menu.css';
import { Menu, Segment, Button, Image } from 'semantic-ui-react'
import Login from '../components/Login'

export default class MenuHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted style={{borderRadius:'0', position:'fixed', width: '100%', top:'0', padding:'0 4rem 0 2rem', zIndex:'1'}}>
        <Menu inverted secondary style={{position:'relative'}}>
          <Menu.Item style={{verticalAlign:"text-top", position:'relative', top:'0', paddingTop:'0'}}>
            <Image src='/Logo.png' style={{width:'80px'}}/>
          </Menu.Item>
          <Menu.Item position='right' style={{padding:'0', margin:'0'}}>
            <Login/>
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}
