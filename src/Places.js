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

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


export class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            lat: '',
            long: '',
            name: '',
            favs: cardPlaces,
            favKeys: [],
            caro: caroPlaces,
            //fav2: {},
            start: {name: '', lat: '', long: ''},
            img: './img/burke.jpg',
            isMapInit: false
        }

        this.showMap = this.showMap.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.get = this.get.bind(this);
        this.addToGroup = this.addToGroup.bind(this);

        console.log('places constructor');
        console.log(this.props);
    }

    // shows favorite card on map!
    showMap(l, ll, nn) {
        this.setState({show: true, lat: l, long: ll, name: nn});
    }

    // closes modal
    handleClose = () => this.setState({show: false})

    // add carousel to favorite
    addToGroup(place) {
        console.log('CAROUSELLLL ADDDDDDD');
        this.props.add(place);
    }

    // deletes favorite card
    handleDelete = (key) => {
        this.props.delete(key);
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
        this.setState({start: startLocation});
    }

    saveMap = map => {
        this.map = map;
        this.setState({
            isMapInit:true
        });
    }

    

    render() {

        // let FAV = [this.props.favs];
        // console.log(FAV);
        console.log('render places');
        console.log(this.props);
        //console.log(this.state.favs2.then(val => {return val}));

        // let FAV = this.props.favs;
        // let favsUndone = Object.keys(FAV);
        // console.log(favsUndone);

        // handling props changes & resetting state if changed
        if (this.props.favs != null || this.props.favs != undefined) {
            let c = [];
            let favKeys = Object.keys(this.props.favs)
            favKeys.map((key) => { // place = array of keys ie: a;ifhwiua123
                    console.log(key);
                    //console.log();
                    c.push(<PlaceCards
                                place = {this.props.favs[key]} 
                                placeKey = {key}
                                dealWithPlace={this.showMap.bind(this)} 
                                handleDelete = {this.handleDelete.bind(this)} />);
            });
            this.state.cards = c;
            console.log(this.state.cards);
        } else {
            this.state.cards = <h1 id="no-favs">Head over to our carousel or home page to add things to your favorites!</h1>
        }

        if (this.props.caro != null || this.props.caro != undefined) {
            console.log(this.props.caro);
            let car = [];
            this.props.caro.map((place) => {
                car.push(<CarouselItem>
                            <CarouselPlace carPlace = {place} 
                                        addToGroup = {this.addToGroup.bind(this)} />
                        </CarouselItem>)
            });
            this.state.caroThing = car;
            console.log('caroPlaces prop works now????')
            console.log(this.state.caroThing);
        } 

        if (this.props.zip != null || this.props.zip != undefined) {
            console.log(this.props.zip);
            this.state.zip = this.props.zip;
        } 

        const marker = this.state.hasLocation ? (
            <Marker position={[this.state.start.lat, this.state.start.long]}>
              <Popup>{this.state.start.name}</Popup>
            </Marker>
          ) : null
        
        return (
            <div>
                <div style = {{'text-align': 'center'}}>
                    <h2>Places near zip: {this.state.zip} </h2>
                    <p>Customize your zip in profile!</p>
                </div>
                <div className = 'container d-flex justify-content-center'>
                    <Carousel stype = {{padding: '2rem'}} className = 'col-12 col-md-12 col-lg-10 col-xl-9'>
                        {this.state.caroThing}
                    </Carousel>
                </div>
                <div style = {{'text-align': 'center'}}>
                    <h2>My Favorited Places!</h2>
                    <p>Add and remove places by pressing the heart!</p>
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