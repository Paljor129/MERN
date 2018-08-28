import React from 'react';
import { Divider, Header, Message } from 'semantic-ui-react'
import Link from 'react-router-dom/Link';

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
            <div className="ui container">
                <div className="ui two column middle aligned very relaxed stackable grid">
                    <div className="centered column">
                        <Message
                            attached
                            header='Connectez-vous avec votre email et mot de passe'
                            // content='Connectez-vous avec votre email et mot de passe'
                        />
                        <div className="ui form">
                            <div className="field">
                                <label>Email</label>
                                <div className="ui left icon input">
                                    <input 
                                    name="email" 
                                    placeholder="joe@cool.com" 
                                    type="email" 
                                    onChange={
                                        this.updateInput
                                    }
                                    value={
                                        this.state.email
                                    } />
                                    <i className="user icon"></i>
                                </div>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <div className="ui left icon input">
                                    <input
                                    name="password"
                                    type="password"
                                    placeholder="Mot de passe"
                                    onChange={
                                        this.updateInput
                                    }
                                    value={
                                        this.state.password
                                    } />
                                    <i className="lock icon"></i>
                                </div>
                            </div>
                            <div className="ui big blue button" 
                                onClick={
                                    this.handleLogin
                                }>
                                Se connecter
                            </div>
                        </div>
                    </div>
                    <Divider horizontal>ou</Divider>
                    <div className="centered aligned column">
                        <Header as="h3" textAlign="center">
                            <Header.Content>Pas encore crée un compte?</Header.Content>
                        </Header>
                        <Link to='/register'>
                            <div className="ui big green labeled icon button">
                                <i className="signup icon"></i>
                                S'inscrire
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
                
            
            

        )
    }
};

export default Login;