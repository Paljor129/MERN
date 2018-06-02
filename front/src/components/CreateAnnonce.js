import React from 'react'
import axios from 'axios'

import {
    Form,
    FormGroup,
    Col,
    ControlLabel,
    FormControl,
    Button
} from 'react-bootstrap';


class CreateAnnonce extends React.Component {
    state = {
        villename: "",
        villename2: "",
        period: "",
        titre: ""
    }

    updateInput = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    handleCreateAnnonce = e => {
        e.preventDefault()

        const { villename, villename2, period, titre } = this.state

        axios.post('/auth/createAnnonce', { villename, villename2, period, titre })
            .then(res => {
                console.log(res);
                
            })

    }

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalFirstname" >
                        <Col componentClass={ControlLabel} sm={4} >
                            Lieux de la chambre
                        </Col>
                        <Col sm={4}>
                        <FormControl
                            name="firstname"
                            type="text"
                            placeholder="Lieux de la chambre"
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

                    <FormGroup >
                        <Col smOffset={4} sm={4}>
                        <Button 
                            type="submit"
                            disabled={this.state.disableBtn}
                            onClick={
                            this.handleRegister
                            }> Sign in </Button>
                        </Col>
                    </FormGroup>
                </Form>;
            </div>
        )
    }
}

export default CreateAnnonce