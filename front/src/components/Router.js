import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import '../styles/Router.css'

import Header from './Header'
import Home from './Home'
import CreateAnnonce from './CreateAnnonce'
import Annonce from './Annonce'
import About from './About'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import Redirect from 'react-router-dom/Redirect';
import UpdateAnnonce from './UpdateAnnonce';
import Footer from './Footer'


class Router extends React.Component {
    state = {
        //JSON.parse() to convert local.storage to boolean bcz local.storage is string
        connected: (localStorage.connected)
            ? JSON.parse(localStorage.connected)
            : false,
        auteur: localStorage.auteurId,
        userHasAnnonce: (localStorage.userHasAnnonce)
            ? JSON.parse(localStorage.userHasAnnonce)
            : false,
        user: null,
        ready: false
    }

    connect(user) {
        console.log("connect user ", user);
        console.log('coucou', this.state.connected);
        localStorage.connected = true
        this.setState({
            connected: JSON.parse(localStorage.connected)
        })
        //to make a localStorage.auteur equal to real user id
        localStorage.auteurId = user._id
        this.setState({auteur: localStorage.auteurId})
        this.setState({user: user})
        this.setAnnonce({user})

    }

    setAnnonce({
        user = this.state.user,
        annonce
    }) {
        if (annonce) {
            user.annonce = annonce
        }
        localStorage.userHasAnnonce = !!user.annonce
        this.setState({
            userHasAnnonce: JSON.parse(localStorage.userHasAnnonce)
        })
    }

    unconnect() {
        localStorage.clear();
        this.setState({connected: false, userHasAnnonce: false, auteur: null, user: null});
    }

    componentDidMount() {
        if (this.state.auteur) {
            this.setUser()
        } else {
            this.setState({ready: true})
        }
    }

    setUser() {
        return axios
            .get(`/auth/user/${this.state.auteur}`)
            .then(res => {
                this.setState({user: res.data});
                this.setAnnonce(res.data)
                this.setState({ready: true})
            })
            .catch(err => {
                console.log("res err : ", err);

            })
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header
                        conn={this.state.connected}
                        unconnect={this
                        .unconnect
                        .bind(this)}
                        userHasAnnonce={this.state.userHasAnnonce}/>
                        {this.state.ready && 
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={
                                    (props) => 
                                    <Home 
                                    {...props} 
                                    auteur={this.state.auteur}/>}
                            />
                            <Route
                                path='/createAnnonce'
                                render={(props) => (this.state.auteur
                                ? (<CreateAnnonce
                                    {...props}
                                    auteur={this.state.auteur}
                                    setAnnonce={this
                                    .setAnnonce
                                    .bind(this)}/>)
                                : (<Redirect to='/register'/>))}/>
                            <Route
                                path='/annonce'
                                render={(props) => (this.state.auteur
                                ? (<Annonce 
                                    {...props} 
                                    user={this.state.user}/>)
                                : (<Redirect to='/login'/>))}/>
                            <Route
                                path='/about'
                                component={About} />
                            <Route
                                path='/update'
                                render={(props) => (this.state.auteur
                                ? (<UpdateAnnonce
                                    {...props}
                                    user={this.state.user}
                                    setUser={this
                                    .setUser
                                    .bind(this)}/>)
                                : (<Redirect to='/login'/>))}/>
                            <Route
                                path='/profile'
                                render={(props) => (this.state.auteur
                                ? (<Profile 
                                    {...props} 
                                    user={this.state.user}/>)
                                : (<Redirect to='/login'/>))}/>
                            <Route 
                                path='/updateProfile'
                                render={(props) => (this.state.auteur
                                    ? (<UpdateProfile 
                                        {...props}
                                        user={this.state.user}
                                        setUser={this
                                            .setUser
                                            .bind(this)}
                                        />)
                                    :(<Redirect to='/login' />)
                                )} />
                            <Route
                                path='/register'
                                render={(props) => <Register
                                {...props}
                                connect={this
                                .connect
                                .bind(this)}/>}/>
                            <Route
                                path='/login'
                                render={(props) => <Login
                                {...props}
                                connect={this
                                .connect
                                .bind(this)}/>}/>
                            <Route component={NotFound}/>
                    </Switch>}                      
                    {/* <Footer /> */}
                </div>
            </BrowserRouter>
        )
    }
}

export default Router