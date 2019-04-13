import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";

import { Route, MapMenu } from "pages/MapMaker";
import { MapContainer } from "./MapMaker.styled";

class MapMaker extends Component {
  handleMapClick = event => {
    console.log(event);
  };

  render() {
    return (
      <MapContainer>
        <Map
          onClick={this.handleMapClick}
          center={[50, 10]}
          zoom={6}
          maxZoom={19}
          attributionControl={true}
          zoomControl={false}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <MapMenu />
          <Route />
        </Map>
      </MapContainer>
    );
  }
}

export default MapMaker;