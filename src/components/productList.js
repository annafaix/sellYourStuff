import React, { Component } from 'react';
import ProductItem from './productItem.js'

class productList extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <ProductItem/>
       Product list
      </div>
    );
  }
}

export default productList;
