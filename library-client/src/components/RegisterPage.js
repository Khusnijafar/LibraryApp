import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import {Container, Col, Form,FormGroup, Label, Input, Button,} from 'reactstrap';
// import * as UserActions from '../actions/user.actions'
import axios from 'axios'

class RegisterPage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: '' ,
            email: '' ,
            password: '' ,
            passwordConfirm: '' ,
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value})
    }

    handleEmailChange = (e) => {
      this.setState({ email: e.target.value})
    }

    handlePasswordChange = (e) => {
      this.setState({ password: e.target.value})
    }

    handlePasswordConfirmChange = (e) => {
      this.setState({ passwordConfirm: e.target.value})
    }

    handleSubmit(e) {
      e.preventDefault()
      // let data = {
      //   name : this.state.name,
      //   email : this.state.email,
      //   password : this.state.password,
      //   passwordConfirm : this.state.passwordConfirm
      // }

      let data = {
          name : 'abc',
          email : 'itsharris892@gmail.com',
          password : '12',
          passwordConfirm : '12'
        }

      let headers = {'Content-Type' : "application/json"} 
      // if(!name || !email || !password || !passwordConfirm ) {
      //     alert ('data')
      // };
      // this.props.onSave(name, email, password, passwordConfirm,)
      //  this.setState({ name: '', email: '', password: '', passwordConfirm: '',})
      axios.post('http://localhost:3005/api/user/signup', data, {headers: headers})
      .then(res => {
        console.log(res);
        
      })
      .catch(err => console.log(err));
        
  } 

    // handleRegister = () => {
    //     if(this.state.password !== this.state.passwordConfirm) {
    //         window.alert('Password')
    //     } 
        
    // }

    render() {
      console.log(this.state);
      
      return (
        <Container className="App">
          <h2>Sign In</h2>
          <Form className="form" onSubmit={this.handleSubmit} >
            <Col>
              <FormGroup>
                <Label>Name</Label>
                <Input onChange={this.handleNameChange} value={this.state.name}
                  type="text"
                  name="name"
                  id="examplename"
                  placeholder="Name"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input onChange={this.handleEmailChange} value={this.state.email}
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input onChange={this.handlePasswordChange} value={this.state.password}
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="********"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Confirm Password</Label>
                <Input onChange={this.handlePasswordConfirmChange} value={this.state.passwordConfirm}
                  type="password"
                  name="passwordConfirm"
                  id="examplePassword"
                  placeholder="********"
                />
              </FormGroup>
            </Col>
            <Button type="submit" value="Submit" >Submit</Button>
          </Form>
        </Container>
      );
    }
  }
  
// function mapsStateToProps(state) {
//     return {
//         user: state.user
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(UserActions, dispatch)
//     }
// }

// export default connect (
//     mapsStateToProps,
//     mapDispatchToProps
// )(RegisterPage)

export default RegisterPage