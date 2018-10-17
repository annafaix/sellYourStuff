import React, { Component } from 'react';
import ProductItem from './productItem.js'
import SearchComp from './SearchComp.js'
import FilterCat from './FilterCategories.js'
import PriceSlider from './PriceSlider.js'
import { Divider } from 'semantic-ui-react'

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
      <div style={{marginLeft:"50px", marginRight:"50px"}} >
          <div className="searchFilter" style={{padding:'20px 30px 20px 30px', backgroundColor:'#e0e0d1', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: '40px'}}>
              <SearchComp filterBySearch={this.props.filterBySearch} updateState={this.props.updateState}/>
              <FilterCat category={this.props.category} size="small" addCategory={this.props.addCategory}/>
              <PriceSlider addPrice={this.props.addPrice} min={this.props.minRange} max={this.props.maxRange}/>
          </div>
        <h2>Products for sale:</h2>
        <Divider/>
        <div className="ui stackable cards centered" style={{ marginBottom: '40px'}}>
          {display}
        </div>
      </div>
    );
  }
}

export default productList;
