import React, { Component } from 'react';
import { Icon, Input, Grid, Search, Header, Segment } from 'semantic-ui-react'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export default class SearchComp extends Component {
  constructor(props) {
    super(props);
    this.state = {value: "", products:[], isLoading: false, results: []};
    //this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.resetComponent.bind(this);
  }

  componentDidMount() {
      //Retrieving all products from database
      fetch('http://localhost:3000/api/search/', {
      method: 'POST',
      body: "message from search",
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
      })
      .then(response => {
        return response.json()
      }).then(data => {
          this.setState({products: data});
          //for (var i = 0; i < data.length; i++) {
          //  console.log("Search results " + data[i].name);
          //}
      }).catch(err => {
        console.log(err);
      })

      this.resetComponent();

  }
//recieves user input in search field
/*
  handleChange(event) {
    this.setState({value: event.target.value});
  }*/
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.products, isMatch),
      })
    }, 300)
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  render() {
  let products = this.state.results;
  if(products){
  for (var i = 0; i < products.length; i++) {
    console.log("Search results " + products[i].name);
  }
}
  const { isLoading, value, results } = this.state
  console.log("Search value is " + this.state.value);

    return (
      <div>
          <Input icon placeholder='Search...' style={{margin:"3px 20px 3px 20px"}}>
          <Search style={{borderRadius:"1px"}}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { loading: true })}
            results={results}
            value={value}
            {...this.props}
          />
          </Input>

      </div>
    )
  }
}
