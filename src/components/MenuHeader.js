import React, { Component } from 'react';
import './Menu.css';
import { Menu, Segment } from 'semantic-ui-react'

export default class MenuHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted style={{borderRadius:'0'}}>
        <Menu inverted secondary>
          <Menu.Item
            name='Our Company'
          />
          <Menu.Item
            name='aboutUs'
            active={activeItem === 'aboutUs'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='jobs'
            active={activeItem === 'jobs'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='locations'
            active={activeItem === 'locations'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            icon='shopping cart'
            name='shopingCart'
            active={activeItem === 'shopingCart'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}
