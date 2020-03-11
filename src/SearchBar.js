import React from "react";
// import { start } from "repl";
// import {SearchBox} from "react-google-maps/lib/components/places/SearchBox.js";

/* global google */
const google = window.google;

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
        this.search = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        // this.state = {};
    }

    componentDidMount() {
        this.search = new google.maps.places.SearchBox(this.searchInput.current);

        this.search.addListener('places_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged() {
        let place = this.search.getPlaces();
        let startLocation = {};
        startLocation.name = place[0].name;
        startLocation.lat = place[0].geometry.location.lat();
        startLocation.long = place[0].geometry.location.lng();
        if (place.length == 0) {
            return;
        }

        return this.props.startResult(startLocation);
        // console.log(place);
        // console.log(startLocation);
        // this.props.onPlaceLoaded(place);
    }

    render() {
        return (
            <input ref={this.searchInput}  id="search" placeholder="Enter your address"
                type="text" id="searchBox" className=""></input>
            // <SearchBox ref={this.searchInput}/>
        );
    }
}