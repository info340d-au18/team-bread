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
import Routing from './RoutingMachine2';
import L from 'leaflet';
// import { Marker } from 'leaflet';

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
            start: {name: '', lat: '', long: ''},
            img: './img/burke.jpg',
            isMapInit: false
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
        console.log(startLocation)
        this.setState({start: startLocation});
    }

    saveMap = map => {
        this.map = map;
        this.setState({
            isMapInit:true
        });
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

        const marker = this.state.hasLocation ? (
            <Marker position={[this.state.start.lat, this.state.start.long]}>
              <Popup>{this.state.start.name}</Popup>
            </Marker>
          ) : null
        
        return (
            <div>
                <div className = 'container d-flex justify-content-center'>
                    <Carousel stype = {{padding: '2rem'}} className = 'col-12 col-md-12 col-lg-10 col-xl-9'>
                        {this.state.caroThing}
                    </Carousel>
                </div>
                <div>
                    <div className = 'row justify-content-center'>
                        {this.state.cards}
                    </div>
                    <div>
                        <Modal show = {this.state.show} onHide = {this.handleClose} size = 'lg'>
                            <Modal.Header closeButton>
                                <Modal.Title>Enter a Start Location!</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <SearchBar startResult = {this.handleSearch} />
                                    <div id = 'mapContainer'>
                                        <Map center = {[this.state.lat, this.state.long]} zoom = {14} ref = {this.saveMap}>
                                            {/* <Marker position = {[this.state.lat, this.state.long]} /> */}
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            {marker}
                                                <Routing map={this.map} 
                                                        sLat = {this.state.start.lat}
                                                        sLong = {this.state.start.long}
                                                        eLat = {this.state.lat}
                                                        eLong = {this.state.long} 
                                                        fromForm= {false}/>
                                                {/* <Routing map = {this.map} /> */}
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