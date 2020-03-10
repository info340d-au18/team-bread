import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Loggin} from './Loggin.js';

// import {NavBar} from './NavBar.js';
import {StartSurvey} from './StartSurvey.js';
import {HowTo} from './HowTo.js';
import {FindRoute} from './FindRoute.js';
import {ResultsMap} from './ResultsMap.js';
// import {PlaceGroup} from './PlaceCards';
import {PlaceGroup} from './PlaceCardGroup';
import cardPlaces from './data/cardPlaces.json';
// import {CarouselPlace} from './Carousel.js';
import {Place} from './Places.js';


import {
    BrowserRouter as Router,
    Switch,
    Route,
	Link,
	Redirect
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
							<Route exact path="/team-bread" component={StartSurvey}/>
							<Route exact path="/" component={StartSurvey}/>
							<Route exact path="/howto" component={HowTo}/>
							{/* <Route exact path="/places"> <PlaceGroup place = {cardPlaces} /></Route> */}
							<Route exact path="/places" component={Place} />
							<Route exact path="/login" component={Loggin}/>
							<Route exact path="/findroute" component={FindRoute} />
							<Redirect from="findroute" to="/resultsmap" />
							<Route exact path="/resultsmap" component={ResultsMap} />
						</Switch>
					</div>

				</div>
			</Router>
			// <PlaceGroup place = {cardPlaces} />
    	);
  	}
}