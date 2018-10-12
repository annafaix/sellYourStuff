import React, { Component } from 'react'
import { Header, Button, Popup, Grid } from 'semantic-ui-react'

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

click = (e, { name }) => {
  if( name == this.state.activeItem){
    this.setState({ activeItem: 'all' },()=>{
      console.log(this.state)
    })
  } else {
  this.setState({ activeItem: name },
    this.props.addCategory(name)
  )}
}

render() {
  const { activeItem } = this.state
  const style = {
    width: 'auto'
  }
  return (
    <Popup trigger={<Button>Categories</Button>} flowing hoverable>
      <Grid centered divided columns={4} >
        <Grid.Column textAlign='center' style={style}>
          <Button className='normal' name='Technology' active = { activeItem === 'technology' } onClick={this.click}>Technology</Button>
        </Grid.Column>
        <Grid.Column textAlign='center' style={style}>
          <Button className='normal' name='Entertainment' active = { activeItem === 'entertainment' } onClick={this.click}>Entertainment</Button>
        </Grid.Column>
        <Grid.Column textAlign='center' style={style}>
          <Button className='normal' name='Clothing' active = { activeItem === 'clothing' } onClick={this.click}>Clothing</Button>
        </Grid.Column>
        <Grid.Column textAlign='center' style={style}>
          <Button className='normal' name='Home' active = { activeItem === 'home' } onClick={this.click}>Home</Button>
        </Grid.Column>
      </Grid>
    </Popup>
  )
}
}

export default FilterCategories