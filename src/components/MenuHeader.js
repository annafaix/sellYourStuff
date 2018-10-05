import React, { Component } from 'react';
import './Menu.css';
import { Menu, Segment } from 'semantic-ui-react'

export default class MenuHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="header">
      </div>
    )
  }
}
