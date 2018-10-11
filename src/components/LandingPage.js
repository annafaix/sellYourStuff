import React, { Component } from 'react'
import { Image,  Button } from 'semantic-ui-react'
import Bob from '../omg.svg'

export default class LandingPage extends Component {
  // constructor(props){
  //   super(props);
  // }
  render(){

    return(
      <div className="landingPage">
        <Image src={Bob} style={{height:"50%"}} centered/>
        <h1>Welcome to E.BUY</h1>
        <h2>The online flea market</h2>
        <Button
          style={{ width: "200px", height:"50px"}}
          animated='fade' color="green"
          onClick={()=>console.log("login function will be implemented soon")}>
          <Button.Content visible>Go to market</Button.Content>
          <Button.Content hidden>Log in or Sign-up for FREE</Button.Content>
        </Button>
      </div>
    )
  }
}
