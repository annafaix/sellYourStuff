import React, { Component } from 'react';
import ProductItem from './productItem.js'
import Search from './Search.js'

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
          <div className="searchFilter" style={{padding:'10px 30px 10px 30px', backgroundColor:'#707070'}}>
              <Search/>
          </div>
      {display}
      <button>previous</button>
      <button>next</button>
      </div>
    );
  }
}

export default productList;
