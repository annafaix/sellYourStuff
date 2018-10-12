import React, { Component } from 'react'
//import logo from './logo.svg';
import './PriceSlider.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const Range = Slider.Range;

const style = { width: '100%', padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' };

class PriceSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            priceRange:{
                myMin: this.props.min,
                myMax: this.props.max
            }
        }
    }
    getNewState = status => {
        this.props.addPrice(status.priceRange)
    }
    onSliderChange = (value) => {
        this.props.addPrice({myMin: value[0], myMax: value[1]})
        this.setState({priceRange:{myMin: value[0], myMax: value[1]}})
    }
    render() {
        const priceSlider = (
            <div style={style}>
                {this.state.priceRange.myMin}
                <Range allowCross={false} step={1} min={this.props.min} max={this.props.max}
                defaultValue={[this.props.min, this.props.max]} style={{minWidth:'200px', width: 'auto', marginLeft: 20, marginRight: 20}}
                onChange={this.onSliderChange}/>
                {this.state.priceRange.myMax}
            </div>
        )
        return (
            <div>
                {priceSlider}
            </div>
        )

    }
}


export default PriceSlider