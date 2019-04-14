import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as routeActions from "redux/modules/route";

import { Route, MapMenu } from "pages/MapMaker";
import { MapContainer } from "./MapMaker.styled";

class MapMaker extends Component {
  componentDidMount() {
    const { match, loadRoute } = this.props;
    if (match.params.id) {
      loadRoute(match.params.id);
    }
  }

  handleMapClick = event => {
    this.props.addPoint(event.latlng);
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

const mapStateToProps = state => ({
  route: state.route
});

const mapDispatchToProps = {
  addPoint: routeActions.addPoint,
  loadRoute: routeActions.loadRoute
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MapMaker)
);