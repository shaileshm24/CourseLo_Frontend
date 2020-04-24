import React from 'react';
import { TRELLO_API } from '../utils/constants';

import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import axios from 'axios';
import './register.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role:'',
      manager:''
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
    //console.log(this.state.name,"this.state.name");
  };
  handleRoleChange = event => {
    this.setState({ role: event.target.value });
    //console.log(this.state.name,"this.state.name");
  };
  handleManagerChange = event => {
    this.setState({ manager: event.target.value });
    //console.log(this.state.name,"this.state.name");
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
    //console.log(this.state.email,"this.state.email");
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
    //console.log(this.state.pass,"this.state.pass");
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name:this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      manager: this.state.manager
    };
console.log(user);
    axios.post("http://localhost:3020/api/signup", { user }).then(res => {
      console.log("===============",res)
      if (res.status === 200) {
        this.props.history.push('/login');
      }
    })
    .catch(res => {
      console.log("Manager Not found",res);
      document.getElementById("error").innerHTML = "<font color='red'><b><center> Manager Not Found </center></b></font>"
      // this.props.history.push('/login');
    })
  };

  render() {
    return (
      <div id="sign-up" className="container">
        <h1>Sign up to CourseLo</h1>
        <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl
                type="name"
                placeholder="First Name                                Last Name"
                name="name"
                required
                onChange={this.handleNameChange}
              />
            </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl
                type="email"
                placeholder="Email"
                name="email"
                required
                onChange={this.handleEmailChange}
              />
            </Col>
            </FormGroup>
          <FormGroup controlId="formHorizontalDesi">
            <Col componentClass={ControlLabel} sm={2}>
            Designation 
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Designation"
                name="role"
                required
                onChange={this.handleRoleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalManager">
            <Col componentClass={ControlLabel} sm={2}>
            Manager 
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Manager Name"
                name="manager"
                required
                onChange={this.handleManagerChange}
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
                name="password"
                required
                onChange={this.handlePasswordChange}
              />
            </Col>
          </FormGroup>
          <p id = "error"></p>
           <FormGroup className="form-actions">
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsSize="large" block bsStyle="success">
                Create New Account
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default Register;
