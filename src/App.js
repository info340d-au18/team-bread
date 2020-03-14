import React from 'react';
import './App.css';
import {Loggin} from './Loggin.js';

import {StartSurvey} from './StartSurvey.js';
import {HowTo} from './HowTo.js';
import {FindRoute} from './FindRoute.js';
import {ResultsMap} from './ResultsMap.js';
import {Place} from './Places.js';


import {
    BrowserRouter as Router,
    Switch,
    Route,
	Link,
	Redirect
} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class App extends React.Component {
	constructor() {
		super();
		this.getResults = this.getResults.bind(this);
		this.state = {
			start: {},
			distance:0,
			amenities:"",
			BB:[]
		};
	}

	getResults(start, distance, amenity, bb) {
		console.log("getResults");
		return this.setState({
			start: start,
			distance: distance,
			amenity: amenity,
			BB: bb
		});
	}

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
					<footer>
						<p>© 2020 Jocelyn Afandi &amp; Anna Zhou</p>
					</footer>

					<div>
						<Switch>
							<Route exact path="/team-bread"><StartSurvey home={true}/></Route>
							<Route exact path="/"><StartSurvey home={true}/></Route>
							<Route exact path="/howto" component={HowTo}/>
							<Route exact path="/places" component={Place} />
							<Route exact path="/login" component={Loggin}/>
							<Route exact path="/findroute"> <FindRoute getResults={this.getResults}/> </Route>
							<Redirect from="findroute" to="/resultsmap" />
							<Route exact path="/resultsmap"> <ResultsMap start={this.state.start} distance={this.state.distance} amenity={this.state.amenity}/> </Route>

						</Switch>
					</div>

				</div>
			</Router>
    	);
  	}
}