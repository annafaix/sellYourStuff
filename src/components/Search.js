import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react'
import fetch from 'isomorphic-fetch'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", products: [] };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({ value: event.target.value },
      fetch('http://localhost:3000/api/search/', {
        method: 'POST',
        body: this.state.value,
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      })
        .then(response => {
          console.log('Fetch successful');
          return response.json()
        })
        .catch(function (error) {
          console.log(error);
        }));
  }

  render() {

    return (
      <div>
        <Input icon placeholder='Search...' style={{ margin: "3px 20px 3px 20px" }}>
          <input type="text" value={this.state.value} onChange={this.handleChange} style={{ color: "#707070", padding: '3px' }} />
          <Icon name='search' style={{ color: "black" }} />
        </Input>
      </div>
    )
  }
}
