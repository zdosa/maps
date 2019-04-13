import React from "react";
import { withRouter } from "react-router-dom";

import Navbar, { Brand } from "react-bootstrap/Navbar";
import Nav, { Item, Link } from "react-bootstrap/Nav";

const Navigation = props => {
  const redirect = to => () => {
    props.history.push(`/${to}`);
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Brand>Maps</Brand>
      <Nav>
        <Item>
          <Link onClick={redirect("")}>dashboard</Link>
        </Item>
        <Item>
          <Link onClick={redirect("map")}>map</Link>
        </Item>
      </Nav>
    </Navbar>
  );
};

export default withRouter(Navigation);