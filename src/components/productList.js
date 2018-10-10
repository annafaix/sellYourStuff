import React, { Component } from 'react';
import ProductItem from './productItem.js'

class productList extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
    let productList = this.props.productsProp;
    let display = productList.map(product => {
      return <ProductItem key={product._id} id={product._id} cartFunction={this.props.cartFunction} name={product.name} userName={product.userName} info={product.info}
      userPicture={product.userPicture} price={product.price} category={product.category}/>
    })
    return (
      <div>
      {display}
      <button>previous</button>
      <button>next</button>
      </div>
    );
  }
}

export default productList;
