

import {MapLayer} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

export class RoutingMachine extends MapLayer{
    
    componentDidMount() {
        super.componentDidMount();
        this.leafletElement.addTo(this.props.map);
    }

    render() {
        return null;
    }

    createLeafletElement (props) {
        const {from, to} = this.props;
        console.log(this.props)
        var leafletElement = L.Routing.control({
            waypoints: [
                L.latLng(from[0], from[1]),
                L.latLng(to[0], to[1]),
            ],
        });
        return leafletElement;
    }
}