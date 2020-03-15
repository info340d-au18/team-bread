import React from 'react';
import './App.css';
// import {Loggin} from './Loggin.js';
import Loggin from './Loggin.js';

import {StartSurvey} from './StartSurvey.js';
import {HowTo} from './HowTo.js';
import {FindRoute} from './FindRoute.js';
import {ResultsMap} from './ResultsMap.js';
import {Place} from './Places.js';
import {Button} from 'react-bootstrap';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


import {
    BrowserRouter as Router,
    Switch,
    Route,
	Link,
	Redirect
} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

const firebaseConfig = {
    apiKey: "AIzaSyCVLL1UxsXFkivaYWbQRYffkPgPm_qAPKQ",
    authDomain: "team-bread2.firebaseapp.com",
    databaseURL: "https://team-bread2.firebaseio.com",
    projectId: "team-bread2",
    storageBucket: "team-bread2.appspot.com",
    messagingSenderId: "1061902460600",
    appId: "1:1061902460600:web:35126bb3d81bccc221f64d",
    measurementId: "G-4S9R2VXWSS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID        
    ]
};

export class App extends React.Component {
	constructor() {
		super();
		this.getResults = this.getResults.bind(this);
		this.state = {
			start: {},
			distance:0,
			amenities:"",
			BB:[],
			isSignedIn: false
		};
		this.favoritesRef = firebase.database().ref('favorites');
	}

	componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {                        
            if(user) {
                const userRef = this.favoritesRef.child(user.uid);
                userRef.on("value", (snapshot) => {
                    console.log("the value of favorites/userid changed, so i reset the state")
					// this.setState({ favorites: snapshot.val() })
					this.setState({ isSignedIn: !!user, onSignInPage: false, usern: user })
                })  
            }        
			this.setState({ isSignedIn: !!user })
			//this.setState({ isSignedIn: true})
        })
    }

	getResults(start, distance, amenity, bb) {
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
									{/* <Button> <Link to="/login" className="nav-link" exact>Login</Link> </Button> */}
									<div>
										{this.state.isSignedIn ? 
											<Button onClick={() => firebase.auth().signOut()}>Sign-Out</Button> :
											<Button> <Link to="/login" className="nav-link" exact>Login</Link> </Button>}
									</div>
									
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
							{/* <Route exact path="/places" component={Place} /> */}
							<Route exact path="/places" >
								{!!firebase.auth().currentUser ? <Loggin uiConfig ={uiConfig} fbAuth={firebase.auth}/> : <Place />}  
							</Route>
							<Route exact path = '/login'>
								{!!firebase.auth().currentUser ? <Redirect to="/" /> : <Loggin uiConfig ={uiConfig} fbAuth={firebase.auth}/>}
							</Route>
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