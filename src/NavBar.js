import React, { Component } from 'react';
import {Navbar, NavItem, Nav, NavLink} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {App} from './App.js';
import {HowTo} from './HowTo.js';
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
            <Router>
                <div>
                    <Navbar bg="light" expand="sm">
                        <Navbar.Brand href="#Home" id="navbar-brand">Walk Buddy</Navbar.Brand>
                        <Navbar.Toggle area-controls="basic-navbar-nav" />
                        <Navbar.Collapse>
                            <Nav>
                                <Link to="/" exact>Home</Link>
                                <Link to="/howto" exact>How-To</Link>
                                <Link to="/places" exact>Places</Link>
                                <Link to="/login" exact>Login</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/howto" component={HowTo}/>

                </div>
            </Router>
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