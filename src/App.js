import React from 'react';
import './App.css';
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
		this.findRandom10 = this.findRandom10.bind(this);

		this.state = {
			start: {},
			distance:0,
			amenities:"",
			BB:[],
			isSignedIn: false,
			favs:[],
			homezip: '',
			bbLink: '',
			caroPlaces: []
		};
		this.favoritesRef = firebase.database().ref('favorites');
		this.homeRef = firebase.database().ref('home');
	}

	componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {                        
            if(user) {
				const userRef = this.favoritesRef.child(user.uid);
				// keeps track of user's favorites
                userRef.on("value", (snapshot) => {
					var favSS = snapshot.toJSON();
					this.setState({ 
						isSignedIn: !!user, 
						onSignInPage: false, 
						userId: user.uid,
						favs: favSS
					});
				}); 
				// keeps track of user's home (for rendering carousel)
				let hRef = this.homeRef.child(user.uid);
				hRef.on("value", (snapshot) => {
					let hSS = snapshot.toJSON();
					if (hSS == null) {
						//this.state.firstTime = true;
						//set default to seattle
						hSS = {lat: 47.66142440000001,
						 		long: -122.2683743,
								name: "98105"
							}
					}
					this.setState({
						homezip: hSS
					});

					// creating carousel places (randomizes w/ each new address change)
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

					fetch(op).then((response) =>{
						let r = response.json();
						// figure out way to generalize if no results
						// if (r.length < 1) {
						// 	let op2 = 'http://overpass-api.de/api/interpreter?data=[out:json];node[leisure]' + 
						// 				bb + ';out;';
						// 	fetch(op2).then((r2) => {return r2.json()})
						// }
						return r;
					}).then((data) => {
						let result = [];
						let y = data.elements;

						if (y.length > 1) {
							y = this.findRandom10(y);
						}
				
						for(let i = 0; i < y.length; i++) {
							//handles empty places
							if (y[i] == undefined){
								i++;
							} else if (y[i].tags.name == undefined) {
								i++;
							} else {
								let info = {name: y[i].tags.name, lat: y[i].lat, long: y[i].lon};
								result.push(info);
							}
						}
						return result;
					}).then((placeResults)=>{
						this.setState({caroPlaces: placeResults});
					});
					
				})
				
			}
			this.setState({ isSignedIn: !!user })
        })
    }

	// gets results from form to pass into the results map
	getResults(start, distance, amenity, bb) {
		return this.setState({
			start: start,
			distance: distance,
			amenity: amenity,
			BB: bb
		});
	}

	// add new fav to places
	addFav(place) {
		let userRef = this.favoritesRef.child(this.state.userId);
		userRef.push(
			place
		);
	}

	// remove fav from places & db
	removeFav(key) {
		this.favoritesRef.child(this.state.userId).child(key).remove();
	}

	// profile page - submit new home loc
	submitHome(home) {
		let user = this.homeRef.child(firebase.auth().currentUser.uid);
		// user.setState({homezip})
		// let place = 
		user.set(home)
	}

	// gets bounding box for operpass fetching
    calculateBB(lat, long, radius) {
		let upperLat = (lat - this.getLatDiff(radius)).toFixed(6);
		let upperLong = (long - this.getLongDiff(radius, lat)).toFixed(6);
	
		let lowerLat = (lat + this.getLatDiff(radius)).toFixed(6);
        let lowerLong = (long + this.getLongDiff(radius, lat)).toFixed(6);
        
        // this.setState({BB: mapBbox});
        return '(' + upperLat + ',' + upperLong + ',' + lowerLat + ',' + lowerLong + ')';
    }
    
	// bb helper for longitudes
	getLongDiff(radius, lat) {
		return radius / (111 * Math.cos((Math.PI / 180) * lat));
	}
	
	// bb helper for latitudes
	getLatDiff(radius) {
		return radius / 111;
	}

	findRandom10(data) {
		let places = [];
		let length = data.length;
		let numsUsed = [];
		for (let i = 0; i < 10; i++) {
			let index = Math.round(Math.random() * length);
			while (numsUsed.includes(index)) {
				index = Math.round(Math.random() * length);
			}
			numsUsed.push(index);
			places.push(data[index]);
		}
		return places;
	}

	// handle sign out
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
							<Route exact path=""><StartSurvey home={true}/></Route>
							<Route exact path="/howto" component={HowTo}/>
							<Route exact path="/places" >
								{!!firebase.auth().currentUser ? <Place favs={this.state.favs} add={this.addFav} delete={this.removeFav} caro={this.state.caroPlaces} zip={this.state.homezip.name}/> : <Loggin uiConfig ={uiConfig} fbAuth={firebase.auth}/>}  
							</Route>
							{/* if not logged in, go to log in page, if first time user go to new user else just go to profile page */}
							<Route exact path="/profile">
								{!!firebase.auth().currentUser ? 
									<Profile email = {firebase.auth().currentUser && firebase.auth().currentUser.displayName} 
											zip = {this.state.homezip}
											submitHome = {this.submitHome} />
									: 
									<Loggin uiConfig = {uiConfig} fbAuth = {firebase.auth}/>}
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