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
import {ResultsMarkers} from './ResultsMarkers.js';
//import MarkerClusterGroup from 'react-leaflet-markercluster';

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
		// this.state = {
		// 	lat: 51.505,
		// 	lng: -0.09,
		// 	zoom: 13,
		// }
		//this.state = {test: true};
		// this.state = dummyState;
		// console.log("props");
		// console.log(this.props);
		let redIcon = new L.Icon({
			iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [35, 51],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		  });
		this.state = {
			results: [<ResultsMarkers info={this.props.start} icon={redIcon} start={true}/>]
			//rerender: true
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
		return (
			<Map center={[this.props.start.lat, this.props.start.long]} zoom={16}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
				
				{/* <ResultsMarkers info={this.props.start} icon={redIcon} start={true}/> */}
				<FeatureGroup>
					{/* {	console.log(this.markerCreator(blueIcon))
						// <ResultsMarkers info={this.props.start} icon={redIcon} start={true}/>
						this.markerCreator(blueIcon).map((a) => {
							return a
							// <Marker position={[a.lat, a.long]} icon={blueIcon}>
							// 	<Popup>
							// 		{info.name}
							// 		<br></br>
							// 		<Button variant="dark" type="button">Navigate</Button>
							// 	</Popup>
							// </Marker>
						
						})
					} */}
					{<ResultsMarkers info={this.props.start} icon={redIcon} start={true}/>}
					{<ResultsMarkers info={this.props.start} icon={redIcon} start={false}/>}
				</FeatureGroup>
				
				{/* {this.state.results} */}
				{/* <Marker position={[this.props.end.lat, this.props.end.long]} icon={blueIcon}>
					<Popup>
						{this.props.end.name}
					</Popup>
				</Marker> */}
			</Map>
			// <div>
			// 	{this.markerCreator()}
			// </div>
			
		);
	}

	// componentDidMount() {
	// 	let blueIcon = new L.Icon({
	// 		iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
	// 		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	// 		iconSize: [25, 41],
	// 		iconAnchor: [12, 41],
	// 		popupAnchor: [1, -34],
	// 		shadowSize: [41, 41]
	// 	  });
	// 	let r = this.markerCreator(blueIcon);
	// 	//return this.setState({results: r})
	// }

	markerCreator(icon) {
		console.log(this.props.amenity);
		
		let oLink = this.typeStrings(this.props.amenity, this.props.start.lat, this.props.start.long, this.props.distance);

		fetch(oLink).then((response) =>{
			let r = response.json();
			return r;
		}).then((data) => {
			let result = [];
			let y = data.elements;
			console.log(y);
			if (y.length > 100) {
				y = this.findRandom100(y);
			}
			// var markerGroup;
			// if (y.length > 30) {
			// 	markerGroup = L.markerClusterGroup();
			// } else {
			// 	markerGroup = L.featureGroup();
			// }
			for(let i = 0; i < y.length; i++) {
				if (y[i] == undefined){
					i++;
				} else {
					let info = {name: y[i].tags.name, lat: y[i].lat, long: y[i].lon};
					//console.log(info);
					result.push(<ResultsMarkers info={info} icon={icon} start={false}/>);
					//result.push(info);
				}
			}
			console.log(result);
			// this.setState({results: result});
			return result;
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
		//l et bounds = '(47.481002,-122.459696,47.734136,-122.224433);' // should be a separate function call in the futuer
	
		let bounds = this.calculateBB(lat, long, radius / 2) + ';';
		console.log(bounds);
		let end = 'out'
		
		// if (amenitiesList.length > 0) {
		// 	for (let i = 0; i < amenitiesList.length; i++) {
		// 		link += 'node[amenity=' + amenitiesList[i] + ']' + bounds;
		// 	}
		// 	link += end;
		// }
		// if (leisureList.length > 0) {
		// 	for (let i = 0; i < leisureList.length; i++) {
		// 		link += 'node[leisure=' + leisureList[i] + ']' + bounds;
		// 	}
		// 	link += end;
		// }
		link += 'node[amenity=' + amenity + ']' + bounds + end + ';';
		console.log(link);
		return link;
	}

	calculateBB(lat, long, radius) {
		let upperLat = (lat - this.getLatDiff(radius)).toFixed(6);
		let upperLong = (long - this.getLongDiff(radius, lat)).toFixed(6);
	
		let lowerLat = (lat + this.getLatDiff(radius)).toFixed(6);
		let lowerLong = (long + this.getLongDiff(radius, lat)).toFixed(6);
	
		// https://gis.stackexchange.com/questions/172554/calculating-bounding-box-of-given-set-of-coordinates-from-leaflet-draw
		// create a bounding rectangle that can be used in leaflet
		let mapBbox = [[upperLat,upperLong],[lowerLat,lowerLong]];
	
		// add the bounding box to the map, and set the map extent to it
		// L.rectangle(mapBbox).addTo(mymap);
		//mymap.fitBounds(mapBbox);
	
		return '(' + upperLat + ',' + upperLong + ',' + lowerLat + ',' + lowerLong + ')';
	}

	getLongDiff(radius, lat) {
		// return (radius) * Math.cos(((Math.PI/ 180) * lat));
		return radius / (111 * Math.cos((Math.PI / 180) * lat));
	}
	
	// function dY(radius) {
	getLatDiff(radius) {
		return radius / 111;
	}
}
