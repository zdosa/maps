import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactJson from "react-json-view";

import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const RouteCard = props => {
  const handleClick = id => () => {
    props.history.push(`/map/${id}`);
  };
  if (props.routes.loading) {
    return null;
  }
  return (
    <Container fluid>
      <CardDeck>
        {props.routes.data.map((route, idx) => (
          <Card key={idx} style={{ minWidth: "300px" }} className="mb-4">
            <Card.Body>
              <Card.Title>{route.name}</Card.Title>
              <ReactJson collapsed src={route.points} />
            </Card.Body>
            <Card.Footer>
              <Button onClick={handleClick(route.id)}>See on map</Button>
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

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RouteCard)
);