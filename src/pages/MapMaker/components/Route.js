import React, { Component } from "react";
import { connect } from "react-redux";
import { LayerGroup, Polyline } from "react-leaflet";
import { withRouter } from "react-router-dom";

import * as routeActions from "redux/modules/route";
import { DraggableMarker } from "pages/MapMaker";

const COLOR = "#17a2b8";
const HOVER_COLOR = "#6610f2";
const EDIT_COLOR = "#721c24";
const EDIT_COLOR_HOVER = "#856404";

class Route extends Component {
  state = {
    polylineColor: "#17a2b8",
    polylineWeight: 3,
    markerOpacity: 0.6
  };
  handleUpdate = (id, latLng) => {
    this.props.editPoint(id, latLng);
  };

  handleMouseover = event => {
    const color = this.props.editing ? EDIT_COLOR_HOVER : HOVER_COLOR;
    this.setState({
      polylineColor: color,
      polylineWeight: 5
    });
  };

  handleMouseout = event => {
    const color = this.props.editing ? EDIT_COLOR : COLOR;
    this.setState({
      polylineColor: color,
      polylineWeight: 3
    });
  };

  handleRemove = (id, latLng) => {
    this.props.removePoint(id);
  };

  componentDidUpdate(prevProps) {
    const { editing } = this.props;
    if (editing !== prevProps.editing) {
      this.setState({
        polylineColor: editing ? EDIT_COLOR : COLOR,
        polylineWeight: 3,
        markerOpacity: editing ? 1 : 0.6
      });
    }
  }

  render() {
    const { route, editing } = this.props;
    const { polylineColor, polylineWeight, markerOpacity } = this.state;
    if (route.loading || !route.data) {
      return null;
    }

    const polyline = route.data.points.map(route => {
      return [route.lat, route.lng];
    });
    return (
      <LayerGroup>
        {route.data.points.map((route, idx) => (
          <DraggableMarker
            onUpdate={editing ? this.handleUpdate : () => {}}
            onRemove={editing ? this.handleRemove : () => {}}
            editing={editing}
            key={idx}
            id={route.id}
            lat={route.lat}
            lng={route.lng}
            opacity={markerOpacity}
          />
        ))}
        <Polyline
          color={polylineColor}
          weight={polylineWeight}
          onMouseover={this.handleMouseover}
          onMouseout={this.handleMouseout}
          positions={[polyline]}
        />
      </LayerGroup>
    );
  }
}

const mapStateToProps = state => ({
  route: state.route
});

const mapDispatchToProps = {
  editPoint: routeActions.editPoint,
  removePoint: routeActions.removePoint
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Route)
);