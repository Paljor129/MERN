import React from 'react';
import '../styles/Global.css'

import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';

// import AuthService from './AuthService'

class Login extends React.PureComponent {
    state = {
        email: "",
        password: ""
    };

    updateInput = e => {
        //const newState = {};
        //newState[e.target.name] = e.target.value;
        //e.target.name is for each input (email and password) so its neccesary to put name in each form
        this.setState({[e.target.name] : e.target.value});
    };

    handleLogin = e => {
        e.preventDefault();

        const { email, password } = this.state;

        fetch("/auth/login", {
            method: "POST",
            headers: {
                //In req such as POST n PUT, client tells the server what type of data is actually sent
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log("user in login ", res);
            //Here res is the user that i stored in connect(user)
            this.props.connect(res)
            this.props.history.push('/');
        })
        .catch(error => {
            console.log(error)
        });

    }

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail" >
                        <Col componentClass={ControlLabel} sm={4} >
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
                                } />
                        </Col>
                    </FormGroup>

                    <FormGroup >
                        <Col smOffset={4} sm={4}>
                            <Button 
                                type="submit"
                                onClick={
                                    this.handleLogin
                                }> Sign in </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>

        )
    }
};

export default Login;