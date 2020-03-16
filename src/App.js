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
import {Profile} from './Profile.js';
import {NewUser} from './NewUser.js';

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
		this.test = this.test.bind(this);
		this.addFav = this.addFav.bind(this);
		this.removeFav = this.removeFav.bind(this);
		this.submitHome = this.submitHome.bind(this);
		this.calculateBB = this.calculateBB.bind(this);
		this.getLatDiff = this.getLatDiff.bind(this);
		this.getLongDiff = this.getLongDiff.bind(this);
		//this.getFavs = this.getFavs.bind(this);

		this.state = {
			start: {},
			distance:0,
			amenities:"",
			BB:[],
			isSignedIn: false,
			favs:[],
			homezip: '',
			bbLink: ''
		};
		this.favoritesRef = firebase.database().ref('favorites');
		this.homeRef = firebase.database().ref('home');
		//this.personRef = firebase.database().ref('person');
	}

	componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {                        
            if(user) {
				const userRef = this.favoritesRef.child(user.uid);
				console.log(user);
                userRef.on("value", (snapshot) => {
                    console.log("the value of favorites/userid changed, so i reset the state")
					// this.setState({ favorites: snapshot.val() })
					var favSS = snapshot.toJSON();
					console.log(favSS);
					this.setState({ 
						isSignedIn: !!user, 
						onSignInPage: false, 
						userId: user.uid,
						favs: favSS
					});
				})
				let hRef = this.homeRef.child(user.uid);
				hRef.on("value", (snapshot) => {
					let hSS = snapshot.toJSON();
					this.setState({
						homezip: hSS
					})
					console.log(this.state.homezip)
					let bb = this.calculateBB(hSS.lat, hSS.long, 5);
					let op = 'http://overpass-api.de/api/interpreter?data=[out:json];node[leisure=dog_park]' + 
							bb + 
							';out;node[leisure=fire_pit]' +
							bb + ';out;node[leisure=garden]' +
							bb + ';out;node[leisure=nature_reserve]' +
							bb + ';out;node[leisure=park]' +
							bb + ';out;node[leisure=playground]' +
							bb + ';out;node[leisure=track]' + bb +
							';out;'
					this.setState({bbLink: op});

					console.log(op)
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

	addFav(place) {
		console.log('passed up fav');
		let userRef = this.favoritesRef.child(this.state.userId);
		userRef.push(
			place
		);
	}

	removeFav(key) {
		this.favoritesRef.child(this.state.userId).child(key).remove();
	}

	submitHome(home) {
		let user = this.homeRef.child(firebase.auth().currentUser.uid);
		// user.setState({homezip})
		// let place = 
		user.set(home)

		// let bb = this.calculateBB(home.lat, home.long, 10);
		// console.log(bb)
		// let op = 'http://overpass-api.de/api/interpreter?data=[out:json];node[amenity=ice_cream]' 
		// 			bb + ';node[amenity=bar]' +
		// 			bb + ';node[amenty='
		// 			+ ';out;';
		
		// let uRef = this.homeRef.child(user.uid);
		// console.log('hello');
		// uRef.push({home: event});
	}

	// http://overpass-api.de/api/interpreter?data=[out:json];node[amenity=ice_cream](47.481002,-122.459696,47.734136,-122.224433);
    // node[amenity=bar](47.481002,-122.459696,47.734136,-122.224433);out;

    calculateBB(lat, long, radius) {
		let upperLat = (lat - this.getLatDiff(radius)).toFixed(6);
		let upperLong = (long - this.getLongDiff(radius, lat)).toFixed(6);
	
		let lowerLat = (lat + this.getLatDiff(radius)).toFixed(6);
        let lowerLong = (long + this.getLongDiff(radius, lat)).toFixed(6);
        
        // this.setState({BB: mapBbox});
        return '(' + upperLat + ',' + upperLong + ',' + lowerLat + ',' + lowerLong + ')';
    }
    

	getLongDiff(radius, lat) {
		return radius / (111 * Math.cos((Math.PI / 180) * lat));
	}
	
	// function dY(radius) {
	getLatDiff(radius) {
		return radius / 111;
	}

	test() {		
		firebase.auth().signOut()
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
									<Link to="profile" className="nav-link exact">Profile</Link>
									{/* <Button> <Link to="/login" className="nav-link" exact>Login</Link> </Button> */}
									<div>
										{this.state.isSignedIn ? 
											<Button onClick={this.test}>Sign-Out</Button> :
										
										<Link to="/login" className="nav-link" exact>Login</Link> }
											
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
								{!!firebase.auth().currentUser ? <Place favs={this.state.favs} delete={this.removeFav}/> : <Loggin uiConfig ={uiConfig} fbAuth={firebase.auth}/>}  
							</Route>
							{/* if not logged in, go to log in page, if first time user go to new user else just go to profile page */}
							<Route exact path="/profile">
								{/* {!!firebase.auth().currentUser ? <Profile /> : <NewUser usern = {this.state.usern} homeRef = {this.homeRef} />} */}
								{!!firebase.auth().currentUser ? 
									<Profile email = {firebase.auth().currentUser && firebase.auth().currentUser.displayName} 
											zip = {this.state.homezip}
											submitHome = {this.submitHome} />
									: 
									<Loggin uiConfig = {uiConfig} fbAuth = {firebase.auth}>
										<Redirect to="/profile" />
									</Loggin>}
							</Route>
─							<Route exact path = '/login'>
								{!!firebase.auth().currentUser ? <Redirect to="/" /> : <Loggin uiConfig ={uiConfig} fbAuth={firebase.auth}/>}
							</Route>
							<Route exact path="/findroute"> <FindRoute getResults={this.getResults}/> </Route>
							<Redirect from="findroute" to="/resultsmap" />
							<Route exact path="/resultsmap"> 
								<ResultsMap start={this.state.start} 
											distance={this.state.distance} 
											amenity={this.state.amenity}
											addFav={this.addFav}/> 
							</Route>

						</Switch>
					</div>

				</div>
			</Router>
    	);
  	}
}