import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {SearchBar} from './SearchBar.js';
import {
    BrowserRouter as Router,
	Redirect
} from 'react-router-dom';
import './surveyStyle.css';

const amenityTypes = ["bar", "cafe", "cinema", "grave_yard", "ice_cream", "library", "restaurant"];

export class FindRoute extends React.Component {
    constructor () {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecks = this.handleChecks.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDistance = this.handleDistance.bind(this);

        this.state = {
            redirect: false,
            start: {name: "USC Village", lat: 34.0256262, long: -118.285044},
            distance: 5,
            amenity: "cafe",
            BB: [["34.003104", "-118.312219"]["34.048149", "-118.257869"]]
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
                </Form.Group>

                <Form.Group id="form-group">
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
        this.getData();
    }

    handleChecks(e) {
        return this.setState({
            amenity: e.target.value
        })
    }

    handleSearch(startLocation) {
        return this.setState({start: startLocation});
    }
    handleDistance(e) {
        return this.setState({distance:e.target.value});
    }

    getData() {
        let oLink = this.typeStrings(this.state.amenity, this.state.start.lat, this.state.start.long, this.state.distance);

		fetch(oLink).then((response) =>{
			let r = response.json();
			return r;
		}).then((data) => {
			let result = [];
			let y = data.elements;
            if (y < 1) {
                
            }
			if (y.length > 100) {
				y = this.findRandom100(y);
			}
			for(let i = 0; i < y.length; i++) {
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
            this.props.getResults(this.state.start, this.state.distance, placeResults);
            return this.setState({redirect: true});
        });
    }

    findRandom100(data) {
		let places = [];
		let length = data.length;
		let numsUsed = [];
		for (let i = 0; i < 100; i++) {
			let index = Math.round(Math.random() * length);
			while (numsUsed.includes(index)) {
				index = Math.round(Math.random() * length);
			}
			numsUsed.push(index);
			places.push(data[index]);
		}
		return places;
	}

    typeStrings(amenity, lat, long, radius) {
		let link = 'https://overpass-api.de/api/interpreter?data=[out:json];';
	
		let bounds = this.calculateBB(lat, long, radius / 2, "overpass") + ';';
		let end = 'out'
		
		link += 'node[amenity=' + amenity + ']' + bounds + end + ';';
		return link;
    }
    
    calculateBB(lat, long, radius, type) {
		let upperLat = (lat - this.getLatDiff(radius)).toFixed(6);
		let upperLong = (long - this.getLongDiff(radius, lat)).toFixed(6);
	
		let lowerLat = (lat + this.getLatDiff(radius)).toFixed(6);
		let lowerLong = (long + this.getLongDiff(radius, lat)).toFixed(6);
	
		// https://gis.stackexchange.com/questions/172554/calculating-bounding-box-of-given-set-of-coordinates-from-leaflet-draw
		// create a bounding rectangle that can be used in leaflet
        let mapBbox = [[upperLat,upperLong],[lowerLat,lowerLong]];
        this.setState({BB: mapBbox});
        return '(' + upperLat + ',' + upperLong + ',' + lowerLat + ',' + lowerLong + ')';
    }
    

	getLongDiff(radius, lat) {
		return radius / (111 * Math.cos((Math.PI / 180) * lat));
	}
	
	// function dY(radius) {
	getLatDiff(radius) {
		return radius / 111;
	}
}