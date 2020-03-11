import React, {
	Component
} from 'react';
import {
	Map,
	TileLayer,
	Marker,
	Popup,
	FeatureGroup
} from 'react-leaflet';
import {Button} from 'react-bootstrap';


import L from 'leaflet';
import 'leaflet-routing-machine'
import {ResultsMarkers} from './ResultsMarkers.js';
//import MarkerClusterGroup from 'react-leaflet-markercluster';
import {Routing} from 'leaflet-routing-machine';


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
		this.nav = this.nav.bind(this);
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
		return (
			<Map center={[this.props.start.lat, this.props.start.long]} zoom={16} bounds={this.props.BB}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
				
				<FeatureGroup>
					<Marker position={[this.props.start.lat, this.props.start.long]} icon={redIcon}>
						<Popup>
							{this.props.start.name}
						</Popup>
					</Marker>
					
					{this.props.amenity.map((a, id) => 
						<Marker position={[a.lat, a.long]} icon={blueIcon}>
							<Popup>
								{a.name}
								<br></br>
								<Button variant="dark" type="button" onClick={this.nav}>Navigate</Button>
							</Popup>
						</Marker>
					)}
				</FeatureGroup>
				{/* <Routing from={34.0249743, -118.2852124} to={34.0256262, -118.285044}/> */}
			</Map>

		);
	}

	nav() {
		console.log("hi");
	}
	
}
