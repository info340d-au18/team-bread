import React, {Component} from 'react';
import {PlaceCards} from './PlaceCards.js';
import {CarouselPlace} from './Carousel.js';
import {Carousel, CarouselItem} from 'react-bootstrap';
import cardPlaces from './data/cardPlaces.json';
import caroPlaces from './data/carouselPlaces.json';
import {Modal} from 'react-bootstrap';
import {SearchBar} from './SearchBar.js';
import './index.css';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

export class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            lat: '',
            long: '',
            name: '',
            favs: cardPlaces,
            caro: caroPlaces,
            start: {name: "USC Village", lat: 34.0256262, long: -118.285044},
            img: './img/burke.jpg'
        }
        this.showMap = this.showMap.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.get = this.get.bind(this);
        this.addToGroup = this.addToGroup.bind(this);
    }

    // shows favorite card on map!
    showMap(l, ll, nn) {
        this.setState({show: true, lat: l, long: ll, name: nn});
    }

    // closes modal
    handleClose = () => this.setState({show: false})

    // add carousel to favorite
    addToGroup(place) {
        let ind = this.get(place.name);
        if (ind === -1) {
            let cur = this.state.favs;
            cur.push(place);
            this.setState({favs: cur});
        }
        
    }

    // deletes favorite card
    handleDelete = (name) => {
        let ind = this.get((name));
        let cur = this.state.favs;
        cur.splice(ind, 1);
        this.setState({favs: cur});
    }

    // gets the index at which the place is at
    get(name) {
        for (let i = 0; i < this.state.favs.length; i++) {
            if (this.state.favs[i].name === name) {
                return i;
            }
        }
        return -1;
    }

    handleSearch(startLocation) {
        return this.setState({start: startLocation});
    }


    render() {
        let c = [];
        this.state.favs.map((place) => {
                c.push(<PlaceCards place = {place} 
                                dealWithPlace={this.showMap.bind(this)} 
                                handleDelete = {this.handleDelete.bind(this)} />);
        })

        let car = [];
        this.state.caro.map((place) => {
            car.push(<CarouselItem>
                        <CarouselPlace carPlace = {place} 
                                    addToGroup = {this.addToGroup.bind(this)} />
                    </CarouselItem>)
        })
        
        this.state.cards = c;
        this.state.caroThing = car;

        return (
            <div>
                <div className = 'container d-flex justify-content-center'>
                    <Carousel stype = {{padding: '2rem'}} className = 'col-12 col-md-12 col-lg-10 col-xl-9'>
                        {this.state.caroThing}
                    </Carousel>
                ></div>
                <div>
                    <div className = 'row justify-content-center'>
                        {this.state.cards}
                    </div>
                    <div>
                        <Modal show = {this.state.show} onHide = {this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Enter a Start Location!</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <SearchBar startResult = {this.handleSearch} />
                                    <div id = 'mapContainer'>
                                        <Map center={[this.state.lat, this.state.long]} zoom={15}>
                                            <TileLayer
                                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[this.state.lat, this.state.long]}>
                                            <Popup>
                                                <h5>{this.state.name}</h5>
                                            </Popup>
                                            </Marker>
                                            <Marker position = {[this.state.start.lat, this.state.start.long]} />
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