import React, { Component } from 'react';
import ProductItem from './productItem.js'
import Search from './SearchComp.js'
import FilterCat from './FilterCategories.js'
import PriceSlider from './PriceSlider.js'
// import { Card } from 'semantic-ui-react'

class productList extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
    let productList = this.props.productsProp;
    let display = productList.map((product, i) => {
      return <ProductItem name={product.name}
                key={i}
                id={product._id}
                cartFunction={this.props.cartFunction}
                userName={product.userName}
                info={product.info}
                userPicture={product.userPicture}
                price={product.price}
                category={product.category}/>
    })
    return (
      <div>
          <div className="searchFilter" style={{padding:'10px 30px 10px 30px', backgroundColor:'#707070', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
              <Search/>
              <FilterCat category={this.props.category} size="small" addCategory={this.props.addCategory}/>
              <PriceSlider addPrice={this.props.addPrice} min={this.props.minRange} max={this.props.maxRange}/>
          </div>
        <div className="ui four stackable cards">
          {display}
        </div>
      </div>
    );
  }
}

export default productList;
