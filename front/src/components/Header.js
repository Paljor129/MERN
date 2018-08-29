import React from 'react'

import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../styles/Header.css'

class Header extends React.Component {
  state = {
    activeItem: 'home'
  }

  handleItemClick = e => { 
    e.preventDefault();
    (name) => this.setState({ activeItem: name })
  }

  handleLogout = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.unconnect()
  }

  render() {
    const { activeItem } = this.state

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
              {/* <LinkContainer to="/about" >
                <NavItem>Qui somme nous</NavItem>
              </LinkContainer> */}
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

              {/* {this.props.conn
                ? <Fragment>
                  <LinkContainer to="/profile">
                    <NavItem>Profil</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/logout">
                    <NavItem onClick={this.handleLogout}>SE DÉCONNECTER</NavItem>
                  </LinkContainer>
                </Fragment>

                : <Fragment>
                  <LinkContainer to="/login" >
                    <NavItem>SE CONNECTER</NavItem>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <NavItem>S'INSCRIRE</NavItem>
                  </LinkContainer>
                </Fragment>
              } */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    )
  }
}
        
export default Header


      // <Segment inverted>
      //   <Menu inverted pointing secondary size='huge'>
      //     <Menu.Item to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
      //     {this.props.userHasAnnonce
      //       ?<Menu.Item
      //         to='/annonce'
      //         name='annonce'
      //         active={activeItem === 'annonce'}
      //         onClick={this.handleItemClick}
      //       />
      //       :<Menu.Item
      //         to='/createAnnonce'
      //         name='creerAnnonce'
      //         active={activeItem === 'creerAnnonce'}
      //         onClick={this.handleItemClick}
      //       />
      //     }

      //     <Menu.Menu position='right'>
      //       {this.props.conn
      //         ?<Fragment>
      //           <Menu.Item
      //             to='/profile'
      //             name='profil'
      //             active={activeItem === 'creerAnnonce'}
      //             onClick={this.handleItemClick}
      //           />
      //           <Menu.Item
      //             to='/logout'
      //             name='se deconnecter'
      //             onClick={this.handleLogout}
      //           />
      //         </Fragment>
      //         :<Fragment>
      //           <Menu.Item
      //             to='/login'
      //             name='se connecter'
      //             active={activeItem === 'se connecter'}
      //             onClick={this.handleItemClick}
      //           />
      //           <Menu.Item
      //             to='/register'
      //             name='sinscrire'
      //             active={activeItem === 'sinscrire'}
      //             onClick={this.handleItemClick}
      //           />
      //         </Fragment>
              
      //       }
      //     </Menu.Menu>
      //   </Menu>
      // </Segment>
      