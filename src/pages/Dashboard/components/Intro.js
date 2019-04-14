import React from "react";
import { connect } from "react-redux";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

import * as routesActions from "redux/modules/routes";

const Intro = props => {
  return (
    <Jumbotron>
      <h1>Hello there!</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <p>
        <Button
          variant="primary"
          disabled={props.routes.loading}
          onClick={() => props.loadRoutes()}
        >
          Load some maps
        </Button>
      </p>
    </Jumbotron>
  );
};

const mapStateToProps = state => ({
  routes: state.routes
});

const mapDispatchToProps = {
  loadRoutes: routesActions.loadRoutes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intro);