import React from 'react'

import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../styles/Header.css'

class Header extends React.Component {

  handleLogout = e => {
    e.preventDefault();
    this.props.unconnect()
  }

  render() {
    return(
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink to="/" activeClassName="is-active" 
              activeStyle={{
                color: 'white',
                fontSize: '1.5em',
                TextDecoration: 'none'
              }}>REX</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {this.props.userHasAnnonce
                ? <LinkContainer to="/annonce" >
                  <NavItem>Annonce</NavItem>
                </LinkContainer>
                : <LinkContainer to="/createAnnonce" >
                  <NavItem>Créer Annonce</NavItem>
                </LinkContainer>
              }
              {this.props.userHasAnnonce && 
                <LinkContainer to="/annonceMatched" >
                  <NavItem>Annonces corréspondant</NavItem>
                </LinkContainer>
              }
            </Nav>
            <Nav pullRight>
              
              {this.props.conn
                ? <LinkContainer to="/profile">
                  <NavItem>Profil</NavItem>
                </LinkContainer>
                : <LinkContainer to="/login" >
                  <NavItem>SE CONNECTER</NavItem>
                </LinkContainer>
              }

              {this.props.conn
                ? <LinkContainer to="/logout">
                  <NavItem onClick={this.handleLogout}>SE DÉCONNECTER</NavItem>
                </LinkContainer>
                : <LinkContainer to="/register">
                  <NavItem>S'INSCRIRE</NavItem>
                </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    )
  }
}
        
export default Header