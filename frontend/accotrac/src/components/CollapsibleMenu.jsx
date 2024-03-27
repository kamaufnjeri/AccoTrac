import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Collapse from 'react-bootstrap/Collapse';

function CollapsibleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#">Your Website Name</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
    <Collapse in={isOpen} id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#">Home</Nav.Link>
        <Nav.Link href="#">Features</Nav.Link>
        <Nav.Link href="#">Pricing</Nav.Link>
        <Nav.Link href="#">Contact</Nav.Link>
      </Nav>
    </Collapse>
  </Navbar>
  );
}

export default CollapsibleMenu
