import React, { Component } from 'react';
import productItem from 'productItem.js'

class prouctList extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <productItem/>
       Product list
      </div>
    );
  }
}

export default productList;
