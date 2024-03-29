import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "../../components/Header";
import { LiveStreamGrid } from "./LiveStreamGrid";
import { LiveStreamView } from "./LiveStreamView";
import { Profile } from "./Profile";

export const Home = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/app" component={LiveStreamGrid} />
        <Route exact path="/app/:streamerId" component={LiveStreamView} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};
