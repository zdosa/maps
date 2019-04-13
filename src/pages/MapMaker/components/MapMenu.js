import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Control from "react-leaflet-control";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import * as routeActions from "redux/modules/route";

const MapMenu = props => {
  const id = props.match.params.id;
  return (
    <Control position="topleft">
      <ButtonGroup vertical>
        <Button
          disabled={props.route.loading || !id}
          onClick={() => props.loadRoute(id)}
        >
          Load route
        </Button>
        <Button>Create route</Button>
      </ButtonGroup>
    </Control>
  );
};

const mapStateToProps = state => ({
  route: state.route
});

const mapDispatchToProps = {
  loadRoute: routeActions.loadRoute
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MapMenu)
);