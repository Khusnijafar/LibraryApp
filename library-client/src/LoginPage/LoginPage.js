import React, { Component } from 'react';
import {Container, Col, Form,FormGroup, Label, Input, Button,} from 'reactstrap';
import axios from 'axios'

class LoginPage extends Component {
    constructor() {
        super() 
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = () => {
        if(this.state.password !== this.state.passwordConfirm) {
            window.alert('Login Berhasil')
        } else {
            axios.post('http://localhost:3005/api/user/login', {
                email: this.state.email,
                password: this.state.password,
                 }, {headers: {'Content-Type': 'application/json'}
                }
            )
            .then((res) => {
                console.log(res);
            })
        }
    }

    render() {
      return (
        <Container className="App">
          <h2>Login</h2>
          <Form className="form">
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input onChange={this.handleChange} value={this.state.email}
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
                <Input onChange={this.handleChange} value={this.state.password}
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="********"
                />
              </FormGroup>
            </Col>
            <Button onClick={this.handleLogin}><a href='/home' >Submit</a></Button>
          </Form>
        </Container>
      );
    }
  }
  
  export default LoginPage;