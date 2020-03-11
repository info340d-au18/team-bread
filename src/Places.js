import React, {Component} from 'react';
import {PlaceGroup} from './PlaceCardGroup.js';
import {CarouselPlace} from './Carousel.js';
import cardPlaces from './data/cardPlaces.json';
import caroPlaces from './data/carouselPlaces.json';
// import {MapPopup} from './MapPopup.js';

export class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            lat: '',
            long: '',
            name: '',
            cards: []
        }
        this.showMap = this.showMap.bind(this);
        // this.addToGroups = this.addToGroups.bind(this);
    }

    showMap(l, ll, nn) {
        this.setState({show: true, lat: l, long: ll, name: nn});
    }

    // addToGroups(card) {
    //     console.log(this.state.cards)
    //     let cur = this.state.cards;
    //     // console.log(cur);
    //     cur.push(card);
    //     this.setState({cards: cur});
    // }

    handleClose = () => this.setState({show: false})

    render() {
        let pg = <PlaceGroup place = {cardPlaces} 
                    showMap = {this.showMap} 
                    p = {this.state.show} 
                    lat = {this.state.lat} 
                    long = {this.state.long} 
                    name = {this.state.name}
                    handleClose = {this.handleClose} />
        
        // console.log(this.state.cards)

        // pg.props.place.push({name: "Washington Park Arboretum", description: "Chill nature walk", source: "./img/arboretum.jpg", alt: "Japanese Garden in Washington Park Arboretum", lat: 47.639774, long: -122.294524});
        this.state.cards = pg.props.place;
        // console.log(this.state.cards.props.place)
        console.log(this.state.cards)
        return (
            <div>
                <CarouselPlace carPlace = {caroPlaces} 
                    addToGroups = {this.addToGroups} />
                {pg}
            </div>
        )
    }
}