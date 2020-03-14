import React, {
	Component
} from 'react';
import {
	Map,
	TileLayer,
	Marker,
	Popup,
	FeatureGroup,
	MapLayer
} from 'react-leaflet';
import {Button} from 'react-bootstrap';


import L from 'leaflet';
import 'leaflet-routing-machine'
import {ResultsMarkers} from './ResultsMarkers.js';
//import MarkerClusterGroup from 'react-leaflet-markercluster';
//import {Routing} from 'leaflet-routing-machine';
//import {RoutingMachine} from './RoutingMachine.js';
import Routing from './RoutingMachine2';


import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

import './surveyStyle.css';

// let State = {
//   lat: number,
//   lng: number,
//   zoom: number,
// }
// <{}, State> arg for Component?

// let dummyState = {
// 	start: {name: "USC Village", lat: 34.0256262, long: -118.285044},
// 	distance: 5,
// 	amenity: {restaurant: true},
// 	//leisure: {},
// 	end: {name: "Little Galen Center", lat: 34.0228165, long: -118.2870715}
// }


export class ResultsMap extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.handleNav = this.handleNav.bind(this);
		//this.map = React.createRef();
		this.state = {
			routingReady: false,
			end: {},
			isMapInit: false,
		}
	}

	render() {
		let redIcon = new L.Icon({
			iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [35, 51],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		  });
		  let blueIcon = new L.Icon({
			iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		  });

		if (this.state.routingReady) {
			console.log('test');
			return(
				<Map center={[this.props.start.lat, this.props.start.long]} zoom={16} bounds={this.props.BB} ref={this.saveMap}>
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
					
					<Routing map={this.map} 
						//sName = {this.props.start.name}
						sLat = {this.props.start.lat}
						sLong = {this.props.start.long}
						// sIcon = {redIcon}
						//eName = {this.state.end.name}
						eLat = {this.state.end.lat}
						eLong = {this.state.end.long} />
				</Map>
			)
		}
		return (
			<Map center={[this.props.start.lat, this.props.start.long]} zoom={16} bounds={this.props.BB} ref={this.saveMap}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
				
				<FeatureGroup>
					<ResultsMarkers lat={this.props.start.lat} 
									long={this.props.start.long}
									name={this.props.start.name} 
									icon={redIcon} 
									start={true}
									route={this.handleNav}/>
					
					{this.props.amenity.map((a, id) => 
						//<ResultsMarkers info={a} icon={blueIcon} start={this.props.start} route={this.handleNav} map={this.map}/>
						<ResultsMarkers lat={a.lat} 
									long={a.long}
									name={a.name} 
									icon={blueIcon} 
									start={false}
									route={this.handleNav}/>
					)}
					
				</FeatureGroup>
			</Map>
		);
	}

	handleNav(endP) {
		console.log("hi");
		console.log(endP);
		return this.setState({
			end: endP,
			routingReady: true
			
		});
	}

	saveMap = map => {
        this.map = map;
        this.setState({
            isMapInit:true
        });
    }
	
}
