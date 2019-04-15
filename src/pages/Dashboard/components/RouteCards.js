import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactJson from "react-json-view";

import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { DeleteRouteModal } from "pages/Dashboard";
import * as routesActions from "redux/modules/routes";

const RouteCard = props => {
  if (props.routes.loading) {
    return null;
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(false);

  const handleOpenMap = id => () => {
    props.history.push(`/map/${id}`);
  };

  const handleDelete = id => () => {
    props.deleteRoute(id);
    setShowDeleteModal(false);
  };

  const handleOpenDeleteModal = route => () => {
    setSelectedRoute(route);
    setShowDeleteModal(true);
  };

  return (
    <Container fluid>
      <DeleteRouteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onDelete={handleDelete}
        selectedRoute={selectedRoute}
      />
      <CardDeck>
        {props.routes.data.map((route, idx) => (
          <Card key={idx} style={{ minWidth: "300px" }} className="mb-4">
            <Card.Body>
              <Card.Title>{route.name}</Card.Title>
              <ReactJson collapsed src={route.points} />
            </Card.Body>
            <Card.Footer>
              <ButtonGroup>
                <Button onClick={handleOpenMap(route.id)}>See on map</Button>
                <Button
                  variant="secondary"
                  onClick={handleOpenDeleteModal(route)}
                >
                  Remove
                </Button>
              </ButtonGroup>
            </Card.Footer>
          </Card>
        ))}
      </CardDeck>
    </Container>
  );
};

const mapStateToProps = state => ({
  routes: state.routes
});

const mapDispatchToProps = {
  deleteRoute: routesActions.deleteRoute,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RouteCard)
);