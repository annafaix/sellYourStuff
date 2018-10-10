import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {word: ""};
  }




  render() {


    return (
      <div>
          <Input icon placeholder='Search...' style={{marginLeft:"20px"}}>
           <input style={{color:"#707070"}}/>
           <Icon name='search' style={{color:"black"}}/>
          </Input>
      </div>
    )
  }
}
