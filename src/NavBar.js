import React, { Component } from 'react';
import {Navbar, NavItem, Nav, NavLink} from 'react-bootstrap';
import './surveyStyle.css';

// export class Global extends React.Component {
    

    
//     render() {
//         return (
//             <NavBar />
//             <Footer />
//         );
//     }
// }

export class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="sm">
                <Navbar.Brand href="#Home" id="navbar-brand">Walk Buddy</Navbar.Brand>
                <Navbar.Toggle area-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        <NavLink href="#Home">Home</NavLink>
                        <NavLink href="#How-To">How-To</NavLink>
                        <NavLink href="#Places">Places</NavLink>
                        <NavLink href="#Login">Login</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export class Footer extends React.Component {
    render() {
        return (
            <footer>
                <p>© 2020 Jocelyn Afandi &amp; Anna Zhou</p>
            </footer>
        );
    }
}