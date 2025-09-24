import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';


const NavigationBar = () => {
  return (
    <Navbar expand='lg' variant='dark' sticky="top" style={{backgroundColor:'darkblue', fontFamily:'Poppins', padding:'20px'}}>
        <Container fluid className='d-flex align-items-center' >
            <Navbar.Brand href='/' className="d-flex align-items-center nav-brand"  style={{ fontFamily: 'cursive' }}>EmailAI</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto align-items-center'>
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link href='/auth'>Login/Register</Nav.Link>
                        <Nav.Link href='/dashboard'>DashBoard</Nav.Link>
                        <Nav.Link href='/logout'>LogOut</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavigationBar