import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { withLeaflet } from "react-leaflet";
import { Map, GoogleApiWrapper } from 'google-maps-react';

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(this.props.sLat, this.props.sLong),
        L.latLng(this.props.eLat, this.props.eLong)
      ],
    //   router: new L.Routing.Google(),
    //   router: L.routing.graphHopper(myApi , {
    //     urlParameters: {
    //         vehicle: 'foot'
    //     }
    // }),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false
    }).addTo(map.leafletElement);

    // this.componentWillMount
    return leafletElement.getPlan();
  }
}

export default withLeaflet(Routing);
