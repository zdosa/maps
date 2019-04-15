import React from "react";
import { connect } from "react-redux";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import * as routesActions from "redux/modules/routes";

const Intro = props => {
  const loading = props.routes.loading;
  return (
    <Jumbotron>
      <h1>Hello there!</h1>
      <p>Click on button below to load some routes.</p>
      <p>
        <Button
          variant="primary"
          disabled={loading}
          onClick={() => props.loadRoutes()}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="mr-3" />
              <span>Loading...</span>
            </>
          ) : (
            <span>Load some routes</span>
          )}
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