import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import CreateAnnonce from './CreateAnnonce'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'

class Router extends React.PureComponent{
    state = {
        connected: false
    }

    connect() {
        console.log('coucou', this.state.connected)
        this.setState({connected: true})
    }
    
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Header conn={this.state.connected}/>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/createAnnonce' component={CreateAnnonce} />
                        {/* <Route path='/logout' /> */}
                        <Route path='/login' render={(props) => <Login {...props} connect={this.connect.bind(this)} />} />
                        <Route path='/register' render={(props) => <Register {...props} connect={this.connect.bind(this)} />} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router