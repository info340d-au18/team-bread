import React, {Component} from 'react';
// import {PlaceGroup} from './PlaceCardGroup.js';
import {PlaceCards} from './PlaceCards.js';
import {CarouselPlace} from './Carousel.js';
import cardPlaces from './data/cardPlaces.json';
import caroPlaces from './data/carouselPlaces.json';
import {Modal} from 'react-bootstrap';
import {SearchBar} from './SearchBar.js';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {PG} from './PG.JS';

export class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            lat: '',
            long: '',
            name: '',
            // cards: ['Washington Park Arboretum', 'Gas Works Park', 'Green Lake Park', 'Pie Bar', 'Sea Wolf Bakery', 'University Village']
            cards: [],
            onPage: [{name: 'Washington Park Arboretum', onP: true}, {name: 'Gas Works Parm', onP: true},
                    {name: 'Green Lake Park', onP: true}, {name: 'Pie Bar', onP: true},
                    {name: 'Sea Wolf Bakery', onP: true}, {name: 'University Village', onP: true}]
        }
        this.showMap = this.showMap.bind(this);
        // this.addToGroups = this.addToGroups.bind(this);
    }

    showMap(l, ll, nn) {
        this.setState({show: true, lat: l, long: ll, name: nn});
    }

    handleClose = () => this.setState({show: false})

    // addToGroup(place) {
    addToGroup = (place) => (pp) => {
        // let cur = this.state.cards;
        console.log(place)
        // let ad = (<PlaceCards place = {place} dealWithPlace={this.showMap(place.lat, place.long, place.name)} />);
        // this.state.cards.push(ad);
        // console.log(this.state.cards)
        // this.setState()
        // console.log(pp)
        // console.log(place);
    }

    handleDelete(name) {
        this.state.onPage[this.get(name)].onP = false;

        console.log(name);


    }

    renderCards() {

    }

    get(name) {
        for (let i = 0; i < this.state.onPage.length; i++) {
            if (this.state.onPage[i].name === name) {
                return i;
            }
        }
        return -1;
    }

    render() {
        // this.state.cards.push(<PlaceCards place = {place} dealWithPlace={this.showMap.bind(this)} />);
        let c = [];
        cardPlaces.map((place) => {
            console.log(place)
            // console.log(this.state.onPage[this.get(place.name)]);
            let x = this.state.onPage[this.get(place.name)];
            // console.log(x.onP)
            // if (this.state.onPage[this.get(place.name)].onP === true) {
                c.push(<PlaceCards place = {place} dealWithPlace={this.showMap.bind(this)} handleDelete = {this.handleDelete.bind(this)} />);
            // }
        })
        this.state.cards = c;
        console.log(this.state.cards)

        return (
            <div>
                <CarouselPlace carPlace = {caroPlaces} 
                    addToGroups = {this.addToGroup} />
                <div>
                    <div className = 'row justify-content-center'>
                        {c}
                    </div>
                    <div>
                        <Modal show = {this.state.show} onHide = {this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Enter a Start Location!</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <SearchBar />
                                    <div id = 'mapContainer'>
                                        <Map center={[this.state.lat, this.state.long]} zoom={13}>
                                            <TileLayer
                                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[this.state.lat, this.state.long]}>
                                            <Popup>
                                                <h5>{this.state.name}</h5>
                                            </Popup>
                                            </Marker>
                                        </Map>
                                    </div>
                                </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}