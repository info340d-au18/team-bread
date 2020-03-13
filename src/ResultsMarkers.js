import React, {
    Component
} from 'react';
import {
    Marker,
    Popup
} from 'react-leaflet';
import {Button} from 'react-bootstrap';


import L from 'leaflet';
import {RoutingMachine} from './RoutingMachine.js';


export class ResultsMarkers extends React.Component {
    constructor(props) {
        super(props);
        this.handleRoute = this.handleRoute.bind(this);
    }

    render() {
        return (
            <Marker position={[this.props.info.lat, this.props.info.long]} icon={this.props.icon}>
                {this.createPopup()}
            </Marker>
        );
    }

    createPopup() {
        let name = this.props.info.name;
        if(this.props.start === true) {
            return(
                <Popup>
                    {name}
                </Popup>
            );
        }
        return(
            <Popup>
                {name}
                <br></br>
                <Button variant="dark" type="button" onClick={this.handleRoute}>Navigate</Button>
            </Popup>
        );
    }

    handleRoute() {
        console.log('handleROute');
        console.log(this.props.info);
        return this.props.route(this.props.info);
         

        //return this.props.route();
    }
}