import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Loggin} from './Loggin.js';

// import {NavBar} from './NavBar.js';
import {StartSurvey} from './StartSurvey.js';
import {HowTo} from './HowTo.js';
import {FindRoute} from './FindRoute.js';
import {ResultsMap} from './ResultsMap.js';
import {PlaceGroup} from './PlaceCards';
import cardPlaces from './data/cardPlaces.json';
import {CarouselPlace} from './Carousel.js';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {Navbar, NavItem, Nav, NavLink} from 'react-bootstrap';

export class App extends React.Component {
	render() {
    	return (				
			<Router>
				<div>
					<div>
						<Navbar bg="light" expand="sm">
							<Navbar.Brand as={Link} to="/" id="navbar-brand">Walk Buddy</Navbar.Brand>
							<Navbar.Toggle area-controls="basic-navbar-nav" />
							<Navbar.Collapse>
								<Nav>
									<Link to="/" className="nav-link" exact>Home</Link>
									<Link to="/howto" className="nav-link" exact>How-To</Link>
									<Link to="/places" className="nav-link" exact>Places</Link>
									<Link to="/login" className="nav-link" exact>Login</Link>
								</Nav>
							</Navbar.Collapse>
						</Navbar>
					</div>

					<div>
						<Switch>
							<Route exact path="" component={StartSurvey}/>
							<Route exact path="/" component={StartSurvey}/>
							<Route exact path="/howto" component={HowTo}/>
							<Route exact path="/places" component={PlaceGroup}/>
							<Route exact path="/login" component={Loggin}/>
						</Switch>
					</div>

				</div>
			</Router>
    	);
  	}
}