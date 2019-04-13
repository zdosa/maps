import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { Navigation } from "common";
import { Dashboard } from "pages/Dashboard";
import { MapMaker } from "pages/MapMaker";

import store from "redux/store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter className="app">
          <Navigation />
          <Route path="/" exact component={Dashboard} />
          <Route path="/map/:id" exact component={MapMaker} />
          <Route path="/map" exact component={MapMaker} />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;