import React, {Component} from 'react';
import {NavBar} from './NavBar.js';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {SearchBar} from './SearchBar.js';
import {ResultsMap} from './ResultsMap.js';
import './surveyStyle.css';

export class FindRoute extends React.Component {

    render() {
        return (
            <div>
                <NavBar />
                <CreateForm />
            </div>
        );
    }
}

class CreateForm extends React.Component {
    constructor () {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecks = this.handleChecks.bind(this);

        this.state = {
            amenityTypes: ["bar", "cafe", "cinema", "grave_yard", "ice_cream", "library", "restaurant"],
            //leisureTypes: ["amusement_arcade","dog_park", "fitness_centre", "garden", "park"],
            amenity: {}
            //leisure: []
        };
    }

    render() {
        return (
            <Form id="form">
                <Form.Group id="form-group">
                    <h1>The Walk Buddy Route Generator</h1>
                    <p>Please fill out a couple of questions, and soon you'll be on your way!</p>
                </Form.Group>

                <Form.Group id="form-group">
                    <div id="find">
                        <Form.Label><strong>Where are you currently located?</strong></Form.Label>
                        <p>Note: Please only select an address that comes up in the autocomplete below :)</p>
                    </div>
                    <div id="locationField">
                        {/* <Form.Control type="text" placeholder="Enter a start location" id="searchBox"></Form.Control> */}
                        <SearchBar/>
                    </div>
                </Form.Group>

                <Form.Group id="form-group">
                    <Form.Label><strong>What is the maximum distance you'd like to walk today?</strong></Form.Label>
                    
                    <div id="blahblah">
                        <InputGroup>
                            <Form.Control type="number" id="distanceInput" min={0} step={1}></Form.Control>
                            <InputGroup.Append>
                                <InputGroup.Text id="distanceButton">Kilometers</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Form.Group>

                <Form.Group id="form-group">
                    <Form.Label><strong>What types of places would you like to go to?</strong></Form.Label>
                    {this.createSurvey("amenityTypes", this.state.amenityTypes, "amenity")}
                    {/* {this.createSurvey("leisureTypes", this.state.leisureTypes, "leisure")} */}
                </Form.Group>

                <Form.Group id="form-group">
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
                </Form.Group>
            </Form>
        )
    }

    createSurvey(id, placeTypes, overpassType) {
        return (
            <div id={id}>
                <Form.Group>
                    <p><i>{overpassType.charAt(0).toUpperCase() + overpassType.slice(1)}</i></p>
                    {placeTypes.map(type => (
                        <InputGroup>
                            <Form.Check 
                                type="checkbox"
                                label={type.charAt(0).toUpperCase() + type.slice(1)}
                                onClick={this.handleChecks}
                                defaultChecked={false}
                                name={type}
                            />
                        </InputGroup>
                    ))}
                </Form.Group>
            </div>
        );
    }

    handleSubmit(e) {
        console.log(e.target);
        console.log(e);
        console.log(e.target.elements);
        console.log(this.state);
    }

    handleChecks(e) {
        console.log(e.target);
        console.log(e.target.checked);
        console.log(e.target.name);
        console.log(this.state);

        let pT = e.target.name;


        this.setState(prevState => ({
            amenity: {pT: e.target.checked}
        }));
    }
}


// const google = window.google;

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.searchInput = React.createRef();
//     this.search = null;
//     this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
//     this.state = {};
//   }

//   componentDidMount() {
//     this.search = new google.maps.places.SearchBox(this.searchInput.current);

//     this.search.addListener('places_changed', this.handlePlaceChanged);
//   }

//   handlePlaceChanged(){
//     let place = this.search.getPlaces();
//     let startLocation = {};
//     startLocation.name = place[0].name;
//     startLocation.lat = place[0].geometry.location.lat();
//     startLocation.long = place[0].geometry.location.lng();
//     if (place.length == 0) {
//         return;
//     }

//     this.state.place = startLocation;
//     console.log(place);
//     console.log(startLocation);
//     // this.props.onPlaceLoaded(place);
//   }

//   render() {
//     return (
//         <input ref={this.searchInput}  id="search" placeholder="Enter your address"
//          type="text"></input>
//         // <SearchBox ref={this.searchInput}/>
//     );
//   }
// }