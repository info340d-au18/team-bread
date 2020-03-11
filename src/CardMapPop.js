import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

export class CardMapPop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: this.props.place.lat,
            long: this.props.place.long,
            name: this.props.place.name
        }
    }

    render() {
        return (
            <Map center = {[this.state.lat, this.state.long]} zoom = {13}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[this.state.lat, this.state.long]}>
                    <Popup>
                        {this.state.name}
                    </Popup>
                </Marker>
            </Map>
        )
    }
}