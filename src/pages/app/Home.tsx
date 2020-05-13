import React, { useEffect, useRef } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "../../components/Header";
import { LiveStreamGrid } from "./LiveStreamGrid";

export const Home = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={LiveStreamGrid} />
      </Switch>
    </Router>
  );
};
