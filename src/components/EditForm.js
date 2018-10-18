import React from 'react'
import { Form, Button, Header, Icon, Image } from 'semantic-ui-react'
import firebase from "firebase";

// const defaultimg = 'https://firebasestorage.googleapis.com/v0/b/sellyourstuff-b27b2.appspot.com/o/productImages%2Fplaceholder.png?alt=media&token=230fbf95-36cf-4508-a1bb-985511142a86';

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

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      price: this.props.price,
      category: this.props.category,
      userName: this.props.userName,
      userEmail: this.props.userEmail,
      imageName: this.props.imageName,
      userPicture: this.props.userPicture,
      info: this.props.info
    }
  }

  // updateProduct = (productObject) =>{
  //   console.log('sendfile');
  //   // console.log(productObject);
  //   fetch('http://localhost:3000/api/createProduct', {
  //     method: 'PUT',
  //     headers: {
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     body: productObject
  //   }).then(res => {
  //     console.log('Lyckades skicka req till API:et och ladda upp ny produt i databasen:', res);
  //     this.props.tabClick('profile')
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  onCancelUpdate = () => {
    this.props.tabClick('profile');
  }


  render() {
    return (
      <div>
        <Form style={formStyle} >
        <Header as='h2' dividing>
          <Icon name='gift' />
          <Header.Content>
            Edit product
          </Header.Content>
        </Header>

          <Form.Field required>
            <label>Title</label>
            <input
              placeholder='What are you selling'
              name="name"
              value={this.props.name}
              onChange={(e) => this.props.onChangeName(e.target.value)}
            />
          </Form.Field>

          <Form.TextArea
            required
            name="info"
            label='Product information'
            placeholder='Tell us more about youre product...'
            value={this.props.info}
            onChange={(e) => this.props.onChangeInfo(e.target.value)}
          />

          <label style={labelStyle}>
          Category
          </label>
          <select
            name="category"
            className="ui dropdown"
            label='Category'
            placeholder="category"
            value={this.props.category}
            onChange={(e) => this.props.onChangeCategory(e.target.value)}
          >
            {options.map(op => <option key={op.key} value={op.value}>{op.text}</option> )}
          </select>

          <Form.Field>
            <label>Price</label>
            <input
              name="price"
              type='number'
              min="1"
              value={this.props.price}
              onChange={(e) => this.props.validateEditPrice(e.target.value)} />
          </Form.Field>

          <Image src={this.props.userPicture} size='small'/>

          <br />

          <Button onClick={()=> this.props.updateProductInfo()} color='green'><Icon name='save'/> Save </Button>
          <Button type="button" basic color='red' onClick={()=> this.onCancelUpdate()}> Cancel </Button>
        </Form>
       </div>
    )
  }
}

export default EditForm;
