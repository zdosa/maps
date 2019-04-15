import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as routesActions from "redux/modules/routes";
import * as routeActions from "redux/modules/route";

import { Route, MapMenu } from "pages/MapMaker";
import { MapContainer } from "./MapMaker.styled";

class MapMaker extends Component {
  state = {
    editing: false
  };

  componentDidMount() {
    const { match, loadRoute, loadRoutes } = this.props;
    loadRoutes().then(() => {
      if (match.params.id) {
        loadRoute(match.params.id);
      }
    })
    
  }

  handleMapClick = event => {
    this.props.addPoint(event.latlng);
  };

  toggleEditRoute = () => {
    this.setState(state => ({ editing: !state.editing }));
  };

  render() {
    const { editing } = this.state;
    return (
      <MapContainer>
        <Map
          onClick={editing ? this.handleMapClick : () => {}}
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
          <MapMenu editing={editing} toggleEditRoute={this.toggleEditRoute} />
          <Route editing={editing} />
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
  loadRoute: routeActions.loadRoute,
  loadRoutes: routesActions.loadRoutes
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MapMaker)
);