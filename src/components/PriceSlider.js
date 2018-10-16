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
    componentDidMount(){
        let total = this.props.max - this.props.min;
        let portion = total / 10;
        let object = {}
        let min = this.props.min;
        object[min] = ''
        for (let i=0; i < 10; i++){
            min += portion;
            object[min] = '';
        }
        this.setState({marks: object})
    }
    render() {
        const priceSlider = (
            <div style={style}>
                {this.state.priceRange.myMin}
                <Range marks={this.state.marks} allowCross={false} step={1} min={this.props.min} max={this.props.max}
                defaultValue={[this.props.min, this.props.max]} style={{minWidth:'200px', width: 'auto', marginLeft: 20, marginRight: 20}}
                onChange={this.onSliderChange} trackStyle={[{ backgroundColor: 'white' }, { backgroundColor: 'white' }]}
                handleStyle={[{ backgroundColor: '#99ff99' }, { backgroundColor: '#ffcc00' }]}
                railStyle={{ backgroundColor: 'gray' }}/>
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