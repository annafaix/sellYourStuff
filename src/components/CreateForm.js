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
const dafaultimg = 'https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fplaceholder.png?alt=media&token=230fbf95-36cf-4508-a1bb-985511142a86';
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

const labelStyle ={
    display: 'block',
    margin: '0 0 .28571429rem 0',
    color: 'rgba(0,0,0,.87)',
    fontSize:' .92857143em',
    fontWeight: '700',
    textTransform: 'none',
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
      userPicture: 'https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fplaceholder.png?alt=media&token=230fbf95-36cf-4508-a1bb-985511142a86',
      info: ''
    }
  }
  componentDidMount() {
    // firebase.initializeApp(config);
  }

  getFile = (e) =>{
    let file = dafaultimg;

    if (file) {
      let data = new FormData();
      data.append('file', file);
    }
    console.log('file ', file);
    // fileToUpload = file.name;
  }

  uploadFile = () => {
    let link = dafaultimg;
    let file =  document.getElementById('photoUpload').files[0];
    if (file) {
      let storage = firebase.storage();
      let storageRef = storage.ref();

      let metadata = {
        contentType: 'image/jpeg'
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child('/productImages/' + file.name).put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      // console.log(firebase.storage.TaskEvent.STATE_CHANGED);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, (error) => {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            console.log('User doesn'+"'"+'t have permission to access the object');
            break;

          case 'storage/canceled':
            console.log('User canceled the upload');
            break;

          case 'storage/unknown':
            console.log('Unknown error occurred, inspect error.serverResponse');
            break;
        }
      }, () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          link = downloadURL;
          this.setState({userPicture: link })
          console.log('image updated');
          console.log(this.state);
        });
      });
    }else {
      console.log('you did not pick an image, you recived a default image');
      link = dafaultimg;
      this.setState({userPicture: link })
      console.log(this.state);
    }


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

          <label style={labelStyle}>
          Category
          </label>
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

          <Button onClick={()=> this.uploadFile()} type='submit' color='green'> Submit </Button>
          <Button basic color='red' onClick={()=>console.log('cancel')}> Cancel </Button>
        </Form>
       </div>
    )
  }
}

export default CreateForm;
