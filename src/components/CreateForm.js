import React from 'react'
import { Form, Button, Header, Icon, Label } from 'semantic-ui-react'
import firebase from "firebase";
// import firebase from 'firebase/app'
// import config from './Login.js'
// encType='multipart/form-data'
// method='post'
// action='http://localhost:3000/api/registerNewContact'
// style={formStyle} >
// <Head title="CreateContactForm"
// const newContact = require('../postContact').newContact;
// const write = require('../postContact').writeUser;

// const path = require('path');
// const defaultimg = path.join(__dirname, "./public/placeholder.png");
// console.log(defaultimg)
// var fileToUpload = defaultimg;

// const config = {
//   apiKey: "<API_KEY>",
//   authDomain: "<PROJECT_ID>.firebaseapp.com",
//   databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
//   storageBucket: "<BUCKET>.appspot.com",
// };
// firebase.initializeApp(config);
//



// const config = {
//   apiKey: "AIzaSyCJVOXUyP9bMysoDBpqN5nDbV9yQPLq3i4",
//   authDomain: "sellyourstuff-b27b2.firebaseapp.com",
//   databaseURL: "https://sellyourstuff-b27b2.firebaseio.com",
//   storageBucket: "sellyourstuff-b27b2.appspot.com",
// };


const formStyle = {
  backgroundColor: "#f4f4f4",
  borderRadius: "10px",
  width: "80%",
  height: "90%",
  padding: "2rem",
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.2)",
  margin: "auto"
}

const options = [
  { key: 'o', text: 'Other', value: 'Other' },
  { key: 'h', text: 'Home', value: 'Home' },
  { key: 'c', text: 'Clothing', value: 'Clothing' },
  { key: 'e', text: 'Entertainment', value: 'Entertainment' },
  { key: 't', text: 'Technology', value: 'Technology' },
  { key: 'i', text: 'Industrial', value: 'Industrial' }
];

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 1,
      category: 'Other',
      userName: 'namn',
      productCreatorId: this.props.userId,
      imageName: 'fich.jpg',
      userPicture: 'https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2FproductImages%2Ffich.jpg?alt=media&token=b0c989e8-3002-45ca-8d0e-3a41d6fd207f',
      info: ''
    }
  }
  componentDidMount() {
    // firebase.initializeApp(config);
  }

  getFile = (e) =>{
    let file = e.target.files[0];

    if (file) {
      let data = new FormData();
      data.append('file', file);
    }
    console.log(file);
    // fileToUpload = file.name;
  }

  uploadFile = () => {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    let storage = firebase.storage();
    console.log(storage);
    // Create a storage reference from our storage service
    let storageRef = storage.ref();
    console.log(storageRef);
    console.log(this.state);
    // Create a child reference
    // let imagesRef = storageRef.child('images');
    // imagesRef now points to 'images'

    // Child references can also take paths delimited by '/'
    // let spaceRef = storageRef.child('images/space.jpg');
    // spaceRef now points to "images/space.jpg"
    // imagesRef still points to "images"

  }

  render() {
    return (
      <div>
        <Form style={formStyle} >
        <Header as='h2' dividing>
          <Icon name='gift' />
          <Header.Content>
            Create a new add
          </Header.Content>
        </Header>

          <Form.Field>
            <label>Title</label>
            <input
              placeholder='What are you selling'
              name="name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </Form.Field>

          <Form.TextArea
            label='Product information'
            placeholder='Tell us more about youre product...'
            value={this.state.info}
            onChange={(e) => this.setState({ info: e.target.value })}
          />
          <select
            className="ui dropdown"
            label='Category'
            placeholder="category"
            onChange={(e) => this.setState({ category: e.target.value })}
          >
            {options.map(op => <option key={op.key} value={op.value}>{op.text}</option>)}
          </select>

          <Form.Field>
            <label>Price</label>
            <input
              name="price"
              value={this.state.price}
              onChange={(e) => this.setState({ name: e.target.value })} />
          </Form.Field>

          <div style={{ margin: "2rem 0 0 0" }}>
             <label
                htmlFor="photoUpload"
                className="ui icon button">
                <Icon name='upload' />Upload image
              </label>
            <input
              type="file"
              id="photoUpload"
              name="productPhoto"
              onChange={(e) => console.log(e.target.value)}
              style={{ display: "none" }} />
          </div>
          <p style={{ margin: "2rem 0 0 0" }}> {this.state.imageName}</p>

          <br />

          <Button onClick={()=> console.log(this.state)} type='submit' color='green'> Submit </Button>
          <Button basic color='red' onClick={()=>console.log('cancel')}> Cancel </Button>
        </Form>
       </div>
    )
  }
}

export default CreateForm;
