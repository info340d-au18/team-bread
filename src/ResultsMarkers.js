import React, {
    Component
} from 'react';
import {
    Marker,
    Popup
} from 'react-leaflet';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {Button} from 'react-bootstrap';

export class ResultsMarkers extends React.Component {
    constructor(props) {
        super(props);
        this.handleRoute = this.handleRoute.bind(this);
        this.addFav = this.addFav.bind(this);
        this.state = {
            favorited: false,
            info: {name: this.props.name,
                    lat: this.props.lat,
                    long: this.props.long}
        }
        console.log(this.state);
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
        //console.log(this.props);
        return(
            <Popup >
                {this.props.name}
                <br></br>
                <Button variant="dark" type="button" onClick={this.handleRoute}>Navigate</Button>
                {!this.state.favorited ?
                    <Button variant = "dark"
                            //className = 'addFav'
                            onClick = {this.addFav}
                            >
                        <FontAwesomeIcon icon = {faHeart} />
                        Favorite    
                    </Button> :
                    <Button variant = "success">
                        Favorited!    
                    </Button>
                }
                
            </Popup>
        );
    }

    handleRoute() {
        return this.props.route(this.state.info);
    }
    addFav() {
        console.log(this.state);
        this.setState({
            favorited:true
        });
        //this.forceUpdate();
    }
}