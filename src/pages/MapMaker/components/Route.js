import React from "react";
import { connect } from "react-redux";
import { LayerGroup, Polyline } from "react-leaflet";
import { withRouter } from "react-router-dom";

import * as routeActions from "redux/modules/route";
import { DraggableMarker } from "pages/MapMaker";

const Route = props => {
  if (props.route.loading || !props.route.data) {
    return null;
  }
  const route = props.route.data;
  const polyline = route.points.map(route => {
    return [route.lat, route.lng];
  });

  const handleUpdate = (id, latLng) => {
    props.editPoint(id, latLng);
  };

  const handleRemove = (id, latLng) => {
    props.removePoint(id);
  };

  return (
    <LayerGroup>
      {route.points.map((route, idx) => (
        <DraggableMarker
          onUpdate={handleUpdate}
          onRemove={handleRemove}
          key={idx}
          id={route.id}
          lat={route.lat}
          lng={route.lng}
        />
      ))}
      <Polyline positions={[polyline]} />
    </LayerGroup>
  );
};

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