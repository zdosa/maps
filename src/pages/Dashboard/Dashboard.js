import React, { Component } from "react";

import { Intro, RouteCards } from "pages/Dashboard";

class Dashboard extends Component {
  render() {
    return (
      <>
        <Intro />
        <RouteCards />
      </>
    );
  }
}

export default Dashboard;