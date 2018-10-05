import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class ModalLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
        render(){
            return (
                <div>
                <Modal trigger={this.props.trigger}>
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
                        <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <img src={this.props.googleLogo} /><button id="login" onClick={() => { this.props.loginWithGoogle() }}>Log in with Google</button>
                            <p>We've found the following gravatar image associated with your e-mail address.</p>
                            <p>Is it okay to use this photo?</p>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
                </div>
            )
        }
    }

    export default ModalLogin
