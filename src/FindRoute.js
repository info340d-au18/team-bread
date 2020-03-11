import React, {Component} from 'react';
// import {NavBar} from './NavBar.js';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {SearchBar} from './SearchBar.js';
// import {ResultsMap} from './ResultsMap.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
	Link,
	Redirect
} from 'react-router-dom';
import './surveyStyle.css';

// export class FindRoute extends React.Component {

//     render() {
//         if (this.state.redirect) {
//             return <Redirect to="/resultsmap" />;
//         }
//         return (
//             <div>
//                 {/* <NavBar /> */}
//                 <CreateForm />
//             </div>
//         );
//     }
// }

const amenityTypes = ["bar", "cafe", "cinema", "grave_yard", "ice_cream", "library", "restaurant"];
//const leisureTypes = ["amusement_arcade","dog_park", "fitness_centre", "garden", "park"];

export class FindRoute extends React.Component {
    constructor () {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecks = this.handleChecks.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDistance = this.handleDistance.bind(this);

        this.state = {
            redirect: false,
            start: {name: "USC Villageasdf", lat: 34.0256262, long: -118.285044},
            distance: 5,
            //amenity: {cafe: true, restaurant:true}
            amenity: "cafe"
            //leisure: []
        };
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/resultsmap" />;
        }
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
                        <SearchBar startResult={this.handleSearch}/>
                    </div>
                </Form.Group>

                <Form.Group id="form-group">
                    <Form.Label><strong>What is the maximum distance you'd like to walk today?</strong></Form.Label>
                    
                    <div id="blahblah">
                        <InputGroup>
                            <Form.Control type="number" id="distanceInput" min={0} step={1} onChange={this.handleDistance}></Form.Control>
                            <InputGroup.Append>
                                <InputGroup.Text id="distanceButton">Kilometers</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Form.Group>

                <Form.Group id="form-group">
                    <Form.Label><strong>What types of places would you like to go to?</strong></Form.Label>
                    {this.createSurvey("amenityTypes", amenityTypes, "amenity")}
                    {/* {this.createSurvey("leisureTypes", this.state.leisureTypes, "leisure")} */}
                </Form.Group>

                <Form.Group id="form-group">
                    {/* <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button> */}
                    <Button variant="primary" type="button" onClick={this.handleSubmit}>Submit</Button>
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
                                type="radio"
                                label={type.charAt(0).toUpperCase() + type.slice(1)}
                                onClick={this.handleChecks}
                                defaultChecked={false}
                                // name={type}
                                name={overpassType}
                                value={type}
                            />
                        </InputGroup>
                    ))}
                </Form.Group>
            </div>
        );
    }

    handleSubmit(e) {
        console.log("handle submit");
        console.log(this.state);
        this.props.getResults(this.state.start, this.state.distance, this.state.amenity);
        return this.setState({redirect: true});
    }

    handleChecks(e) {
        console.log("handle checks");
        // let name = e.target.name;
        // let checked = e.target.checked;
        // let temp = {};
        // temp[name] = checked;

        // const {name, checked} = e.target;
        // console.log(this.state);
        // return this.setState({
        //     amenity: {[name]: checked}
        // })
        //const {name, checked} = e.target;
        console.log(this.state);
        return this.setState({
            amenity: e.target.value
        })
    }

    handleSearch(startLocation) {
        console.log("handle search");
        console.log(this.state);
        return this.setState({start: startLocation});
    }
    handleDistance(e) {
        console.log("handle distance");
        console.log(e.target.value);
        return this.setState({distance:e.target.value});
    }
}