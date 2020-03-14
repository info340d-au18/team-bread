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


  componentDidUpdate() {
    this.initializeRouting();
  }

  componentWillUnmount() {
    this.destroyRouting();
  }

  // 43b6f68e-d0b7-4312-933c-8d640f9a92d2
  initializeRouting() {
    if (this.props.map && !this.routing) {
      const plan = new L.Routing.Plan([
        L.latLng(this.props.sLat, this.props.sLong),
        L.latLng(this.props.eLat, this.props.eLong)
      ], {
        routeWhileDragging: false,
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
