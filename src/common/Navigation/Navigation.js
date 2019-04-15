import React from "react";
import { withRouter } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigation = props => {
  const redirect = to => () => {
    props.history.push(`/${to}`);
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <Navbar.Brand>Maps</Navbar.Brand>
        <Nav>
          <Nav.Item>
            <Nav.Link onClick={redirect("")}>dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={redirect("map")}>map</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);