import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Image, NavItem } from 'react-bootstrap';
import Login from '../login/index';

function Header() {

  return (
    <header id="header">
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={`/`}>
              <Image src="/images/logo1.svg" responsive />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
           Welcome 
            
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
export default Header;
