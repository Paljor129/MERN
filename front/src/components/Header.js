import React, { Fragment } from 'react'
// import '../styles/Global.css'

import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Header extends React.Component {
  
  handleLogout = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.unconnect()
  }

  render() {
    return(
      <div>
        <Navbar inverse collapseOnSelect color="blue">
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink to="/" activeClassName="is-active">Accueil</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {this.props.userHasAnnonce
                ?<LinkContainer to="/annonce" >
                  <NavItem>Annonce</NavItem>
                </LinkContainer>
                :<LinkContainer to="/createAnnonce" >
                  <NavItem>Créer Annonce</NavItem>
                </LinkContainer>
              }
            </Nav>
            <Nav pullRight>
              { this.props.conn 
                ?<Fragment>
                  <LinkContainer to="/profile">
                    <NavItem >Profil</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/logout">
                    <NavItem onClick={this.handleLogout}>SE DÉCONNECTER</NavItem>
                  </LinkContainer>
                  
                </Fragment>
                :<Fragment>
                  <LinkContainer to="/login" >
                    <NavItem >SE CONNECTER</NavItem>
                  </LinkContainer>
                
                  <LinkContainer to="/register">
                    <NavItem>S'INSCRIRE</NavItem>
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