// Very big thanks to these people on github/stackoverflow for helping
// Routing is very hard :'(
// https://github.com/PaulLeCam/react-leaflet/issues/92

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Popup } from 'react-leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'lrm-graphhopper';

class Routing extends Component {
  static propTypes = {
    map: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      routingPopUp: null,
      token: 'pk.eyJ1IjoiYW5uYXF6aG91IiwiYSI6ImNrNnJoNXRxNzAwbWszbXNieGFkYzcwdTkifQ.LtCGfbNE6CMEeMYQWW0H7A',
      mapbox: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    };
    this.initializeRouting = this.initializeRouting.bind(this);
    this.destroyRouting = this.destroyRouting.bind(this);
    this.setRoutingPopUp = this.setRoutingPopUp.bind(this);
  }
  componentDidMount() {
    if(this.props.fromForm === true) {
      this.initializeRouting();
    }
  }

  componentDidUpdate() {
    this.initializeRouting();
  }

  componentWillUnmount() {
    this.destroyRouting();
  }

  // 43b6f68e-d0b7-4312-933c-8d640f9a92d2
  initializeRouting() {
    let redIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [35, 51],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
      });
    let blueIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
      });
      
    if (this.props.map && !this.routing) {
      const plan = new L.Routing.Plan([
        L.latLng(this.props.sLat, this.props.sLong),
        L.latLng(this.props.eLat, this.props.eLong)
      ], {
        routeWhileDragging: false,
        createMarker: function(i, wp, n) {        
          if (i == 0) {
              return L.marker(wp.latLng, {icon: redIcon});
          } else {
              return L.marker(wp.latLng, {icon: blueIcon})
          }
        },
        geocoder: L.Control.Geocoder.nominatim(),
      });

      this.routing = L.Routing.control({
        plan,
        serviceUrl: this.state.mapbox,
        // router: L.Routing.mapbox(this.state.token),
        router: L.Routing.graphHopper('43b6f68e-d0b7-4312-933c-8d640f9a92d2' , {
          urlParameters: {
              vehicle: 'foot'
          }
      }),
      });

      this.props.map.leafletElement.addControl(this.routing);
    }
  }

  destroyRouting() {
    if (this.props.map) {
      this.props.map.leafletElement.removeControl(this.routing);
    }
  }

  setRoutingPopUp(routingPopUp) {
    this.setState({ routingPopUp });
  }

  render() {
    const { routingPopUp } = this.state;
    if (routingPopUp) return <Popup {...this.state.routingPopUp} />;

    return null;
  }
}

export default Routing;
