import React, {Component} from 'react';
import {PlaceCards} from './PlaceCards.js';
import {Modal} from 'react-bootstrap';
import {SearchBar} from './SearchBar.js';
// import L from 'leaflet';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
// import {CarouselPlace} from './Carousel.js';
// import caroPlaces from './data/carouselPlaces.json';

export class PlaceGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }
    dealWithPlace(l, ll, nn) {
        this.props.showMap(l, ll, nn);
    }

    // addFavorite(blah) {
    //     let nc = <PlaceCards place = {blah} dealWithPlace = {this.dealWithPlace.bind(blah)} />
    //     let cur = this.state.cards;
    //     cur.push(nc);
    //     this.setState({cards: cur});
    // }

    render() {
        return (
            <div>
                <div className = 'row justify-content-center'>
                    {this.props.place.map((place) => {
                        let c = <PlaceCards place = {place} dealWithPlace={this.dealWithPlace.bind(this)} />
                        this.state.cards.push(c);
                        return c;
                    })}
                </div>
                <div>
                    <Modal show = {this.props.p} onHide = {this.props.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Enter a Start Location!</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <SearchBar />
                                <div id = 'mapContainer'>
                                    <Map center={[this.props.lat, this.props.long]} zoom={13}>
                                        <TileLayer
                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[this.props.lat, this.props.long]}>
                                        <Popup>
                                            <h5>{this.props.name}</h5>
                                        </Popup>
                                        </Marker>
                                    </Map>
                                </div>
                            </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}