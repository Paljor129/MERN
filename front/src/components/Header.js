import React, { Fragment } from 'react'
import axios from 'axios'

import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Header extends React.PureComponent {
  
  handleLogout = e => {
    e.preventDefault();
    axios.get('/auth/logout')
      .then(res => {
        // console.log(res);
        this.props.history.push('/login')
      })
  }

  render() {
    
    return(
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink to="/" activeClassName="is-active"> Home </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/createAnnonce" >
                <NavItem > CreateAnnonce </NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              { this.props.conn 
                ? <LinkContainer to="/logout">
                    <NavItem onClick={this.handleLogout}> Logout </NavItem>
                  </LinkContainer>
                  :<Fragment>
                    <LinkContainer to="/login" >
                      <NavItem > Login </NavItem>
                    </LinkContainer>
                  
                    <LinkContainer to="/register">
                      <NavItem > Register </NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
        
export default Header