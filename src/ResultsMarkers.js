import React, {
    Component
} from 'react';
import {
    Marker,
    Popup
} from 'react-leaflet';
import {Button} from 'react-bootstrap';


import L from 'leaflet';

export class ResultsMarkers extends React.Component {
    constructor(props) {
        super(props);
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
        if(this.props.start) {
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
                <Button variant="dark" type="button">Navigate</Button>
            </Popup>
        );
    }
}