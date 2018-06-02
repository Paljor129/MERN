import React from "react";
import { withAlert } from "react-alert";

import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';

class Register extends React.PureComponent {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordCheck: "",
    disableBtn: true
  };

  //whenever we change input, it will recreate the state
  updateInput = async e => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    //setState is await (to wait for the reply)
    await this.setState(newState);
    this.canSendForm();
  };

  nonEmptyString = field => {
    if (typeof field === "string" && field !== "") return true;
    else return false;
  };

  canSendForm = () => {
    const nonEmptyFields = this.checkNonEmptyFields();
    const passwords = this.checkPassword(
      this.state.password,
      this.state.passwordCheck
    );
    
    //button will be enable only after all the input will be filled
    if (nonEmptyFields && passwords) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
    
  };
  
  checkNonEmptyFields = () => {
    const { firstname, lastname, email, password, passwordCheck } = this.state;
    if (
      this.nonEmptyString(firstname) &&
      this.nonEmptyString(lastname) &&
      this.nonEmptyString(email) &&
      this.nonEmptyString(password) &&
      this.nonEmptyString(passwordCheck)
    ) {
      return true;
    } else {
      return false;
    }
  };
  
  checkPassword = (password, passwordCheck) => {
    if (password === passwordCheck) return true;
    else return false;
  };
  
  //Properties binds the instance
  //Property called handleRegister 
  handleRegister = e => {
    //prevent the page from submitting
    e.preventDefault();
    console.log(this.state);
    const { firstname, lastname, email, password } = this.state;
    fetch("/auth/register", {
      method: "POST",
      headers: {
        //In req such as POST n PUT, client tells the server what type of data is actually sent
        "Content-type": "application/json"
      },
      body: JSON.stringify({ firstname, lastname, email, password })
    })
    .then(res => {
      console.log(res)
      this.props.connect()
      this.props.history.push('/createAnnonce')
    })
    .catch(error => {
      console.log(error);
    })

    //Change the page to /login
    //this.props.history.push('/help');
    // this.props.alert.show("Vous venez de vous inscrit et maintenant vous pouvez vous connecter");
  };

  render() {
    return (
      <div>

        <Form horizontal>
          <FormGroup controlId="formHorizontalFirstname">
            <Col componentClass={ControlLabel} sm={4}>
              First name
            </Col>
            <Col sm={4}>
              <FormControl
                name="firstname"
                type="text"
                placeholder="Firstname"
                onChange={
                  this.updateInput
                }
                value={
                  this.state.firstname
                } 
                />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalLastname">
            <Col componentClass={ControlLabel} sm={4}>
              Last name
            </Col>
            <Col sm={4}>
              <FormControl 
                name="lastname"
                type="text"
                placeholder = "Lastname"
                onChange={
                  this.updateInput
                }
                value={
                  this.state.lastname
                } 
                />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={4}>
              Email
            </Col>
            <Col sm={4}>
              <FormControl 
                name="email"
                type="email"
                placeholder="Email"
                onChange={
                  this.updateInput
                }
                value={
                  this.state.email
                } 
                />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={4}>
              Password
            </Col>
            <Col sm={4}>
              <FormControl 
                name="password"
                type="password"
                placeholder="Password"
                onChange={
                  this.updateInput
                }
                value={
                  this.state.password
                } 
                />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPasswordCheck">
            <Col componentClass={ControlLabel} sm={4}>
              Password
            </Col>
            <Col sm={4}>
              <FormControl
                name="passwordCheck"
                type="password"
                placeholder="Confirm Password"
                onChange={
                  this.updateInput
                }
                value={
                  this.state.passwordCheck
                }
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={4} sm={4}>
              <Button 
                type="submit"
                disabled={this.state.disableBtn}
                onClick={
                  this.handleRegister
                }> Sign up </Button>
            </Col>
          </FormGroup>
        </Form>;
      </div>
    );
  }
}


export default Register;
