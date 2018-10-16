import React from 'react'
import { Form, Button, Header, Icon } from 'semantic-ui-react'
import firebase from "firebase";

const defaultimg = 'https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fplaceholder.png?alt=media&token=230fbf95-36cf-4508-a1bb-985511142a86';

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
      userPicture: defaultimg,
      info: ''
    }
  }

  sendFile = (productObject) =>{
    console.log(productObject);
    fetch('http://localhost:3000/api/createProduct', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: productObject
    }).then(res => {
      console.log('Lyckades skicka req till API:et och ladda upp ny produt i databasen:', res);
    }).catch(err => {
      console.log(err)
    })
  }

  validateImageLink = (url, callback) => {
    let imgData = new Image();
    imgData.onload = () => {
      callback(true);
    };

    imgData.onerror = () => {
      callback(false);
    };
    imgData.src = url;
  }

  validatePrice = (num) =>{
    let newNum;
    if (isNaN(num)) {
      newNum = 1;
    }else {
      newNum = Number(num);
    }
    this.setState({ price: newNum})
  }

  uploadFile = () => {
    let link = defaultimg;
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
            console.log('User do not have permission to access the object');
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
          console.log('image updated');
          link = downloadURL;
          var jsonProductObject;

          console.log('validating image link ');

          this.validateImageLink(link, (existsImage) => {
            if(existsImage == true) {
              this.setState({userPicture: link })
              console.log('new image exist ', link);
              jsonProductObject= JSON.stringify(this.state)
              this.sendFile(jsonProductObject);
              return;
              // image exist
            }
            else {
              console.log('image do not exist on', link);
              this.setState({userPicture: defaultimg })
              jsonProductObject= JSON.stringify(this.state)
              this.sendFile(jsonProductObject);
              return;
              // image not exist
            }
          });
          // console.log(this.state);
        });
      });
    }else {
      console.log('you did not pick an image, you recived a default image');
      link = defaultimg;
      this.setState({userPicture: link })
      console.log(this.state);
      let productObject= JSON.stringify(this.state)
      this.sendFile(productObject);
      return;
    }

  }

  render() {
    // console.log(typeof this.state.price);
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
              type='number'
              min="1"
              value={this.state.price}
              onChange={(e) => this.validatePrice(e.target.value)} />
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
              onChange={(e) => console.log(e.target.value.name)}
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
