import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Image, NavItem } from 'react-bootstrap';

function Header() {
  return (
    <header id="header">
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={`/`}>
              <Image src="/images/trello-logo-black.svg" responsive />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} className="sign-up">
              <Link to ={"/register"} style = {{color:'grey'}}>
              Sign Up
              </Link>
            </NavItem>
            <NavItem eventKey={2}  className="sign-in">
            <Link to ={"/login"} style = {{color:'grey'}}>
              Log In
              </Link>
            </NavItem>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
export default Header;
