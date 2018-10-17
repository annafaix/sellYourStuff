import React, { Component } from 'react'
// import { Header, Button, Popup, Grid } from 'semantic-ui-react'

const activeStyle = { color: '#99ff66' }
const emptyStyle = {}

class FilterCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      activeItem: 'all'
    }
  }

  click = (e) => {
    let name = e.target.value;
      this.setState({ activeItem: name },
        this.props.addCategory(name)
      )
    }
  componentDidMount() {
    this.setState({ activeItem: this.props.category }, console.log('activeItem: ' + this.state.activeItem))
  }
  render() {
    const { activeItem } = this.state
    const style = {
      width: 'auto'
    }
    const labelStyle = {
      display: 'block',
      margin: '0 0 .28571429rem 0',
      color: 'rgba(0,0,0,.87)',
      fontSize: ' .92857143em',
      fontWeight: '700',
      textTransform: 'none',
    }

    const options = [
      { key: 'a', text: 'All', value: 'all' },
      { key: 'o', text: 'Other', value: 'Other' },
      { key: 'h', text: 'Home', value: 'Home' },
      { key: 'c', text: 'Clothing', value: 'Clothing' },
      { key: 'e', text: 'Entertainment', value: 'Entertainment' },
      { key: 't', text: 'Technology', value: 'Technology' },
      { key: 'i', text: 'Industrial', value: 'Industrial' }
    ];
    return (
      <div>
        <label style={labelStyle}>
          Category
        </label>
        <select
          className="ui dropdown"
          label='Category'
          placeholder="category"
          onChange={this.click}
          style={{height: '60%'}}
        >
          {options.map(op => <option key={op.key} value={op.value}>{op.text}</option>)}
        </select>
      </div>
    )
  }
}

export default FilterCategories
