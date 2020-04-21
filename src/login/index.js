import React from 'react';
import axios from 'axios';
import { TRELLO_API } from '../utils/constants';

import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import './login.scss';

//window.localStorage.setItem("token","")
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token:''
    };
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    
document.getElementById("error").innerHTML = "";


      const user = {
      email: this.state.email,
      password: this.state.password
    };  
   await axios.post(`${TRELLO_API}/login`, { user })
   .then(res => {
     this.state.token = res.data
      window.localStorage.setItem('token',this.state.token);
      console.log(res);
     // localStorage.setItem("status",res.status);
      if (localStorage != null) {
        this.props.history.push('/dashboard');
      }      
    })
    .catch(res =>{
      console.log("Username or Password Wrong!",res);
      document.getElementById("error").innerHTML = "<font color='red'><b><center> Username or password is incorrect </center></b></font>"
       // this.props.history.push('/login');
    })
  };
  render() {
    return (
      <div id="sign-in" className="container">
        <h1>Login to CourseLo</h1>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl
                type="email"
                placeholder="Email"
                required
                onChange={this.handleEmailChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Password"
                required
                onChange={this.handlePasswordChange}
              />
            </Col>
          </FormGroup>
          <p id="error"></p>
          <FormGroup className="form-actions">
            <Col smOffset={2} sm={10}>
              <Button
                type="submit"
                bsStyle="success"
                bsSize="large"
                block
                className="btn2"
              >
                Log in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default Login;
