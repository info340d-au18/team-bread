import React, {
    Component
} from 'react';
import {
    Marker,
    Popup
} from 'react-leaflet';
import {Button} from 'react-bootstrap';

export class ResultsMarkers extends React.Component {
    constructor(props) {
        super(props);
        this.handleRoute = this.handleRoute.bind(this);
    }

    render() {
        return (
            <Marker position={[this.props.lat, this.props.long]} icon={this.props.icon}>
                {this.createPopup()}
            </Marker>
        );
    }

    createPopup() {
        if(this.props.start === true) {
            return(
                <Popup>
                    {this.props.name}
                </Popup>
            );
        }
        return(
            <Popup>
                {this.props.name}
                <br></br>
                <Button variant="dark" type="button" onClick={this.handleRoute}>Navigate</Button>
            </Popup>
        );
    }

    handleRoute() {
        console.log('handleRoute');
        let info = {name: this.props.name,
                    lat: this.props.lat,
                    long: this.props.long}
        return this.props.route(info);
    }
}