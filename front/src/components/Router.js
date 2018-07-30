import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Header from './Header'
import Home from './Home'
import CreateAnnonce from './CreateAnnonce'
import Annonce from './Annonce'
import Profile from './Profile'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'

class Router extends React.Component{
    state = {
        //JSON.parse() to convert local.storage to boolean bcz local.storage is string
        connected : (localStorage.connected)?JSON.parse(localStorage.connected) : false,
        auteur: localStorage.auteurId,
        userHasAnnonce: (localStorage.userHasAnnonce)?JSON.parse(localStorage.userHasAnnonce) :false,
        user: null
    }

    

    connect(user) {
        console.log("connect user ",user);      
        console.log('coucou', this.state.connected);
        localStorage.connected = true
        this.setState({connected: JSON.parse(localStorage.connected)})
        //to make a localStorage.auteur equal to real user id
        localStorage.auteurId = user._id
        this.setState({auteur: localStorage.auteurId}) 
        this.setState({user: user})
        this.setAnnonce({user})
        
    }

    setAnnonce({user = this.state.user, annonce}) {
        console.log({user});

        if(annonce) {
            user.annonce = annonce
        }
        
        localStorage.userHasAnnonce = !!user.annonce 
        this.setState({userHasAnnonce: JSON.parse(localStorage.userHasAnnonce)})
    }

    unconnect() {
            localStorage.clear();
            this.setState({connected: false, userHasAnnonce: false})
        }

    componentDidMount() {
        if(this.state.auteur) {
            axios.get(`/auth/user/${this.state.auteur}`)
                .then(res => {
                    this.setState({ user: res.data });
                    this.setAnnonce(res.data)
                })
                .catch(err => {
                    console.log("res err : ", err);
                    
                })
        }
    }
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Header conn={this.state.connected} unconnect = {this.unconnect.bind(this)} userHasAnnonce={this.state.userHasAnnonce} />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        
                        <Route path='/createAnnonce' render={(props) => <CreateAnnonce {...props} auteur={this.state.auteur} setAnnonce={this.setAnnonce.bind(this)} />} />
                        <Route path='/annonce' component={Annonce} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/register' render={(props) => <Register {...props} connect={this.connect.bind(this)} />} />
                        <Route path='/login' render={(props) => <Login {...props} connect={this.connect.bind(this)} />} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router