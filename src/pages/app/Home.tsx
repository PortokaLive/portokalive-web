import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { Header } from "../../components/Header";

export const Home = () => {
  const myMediaSource = new MediaSource();
  const url = URL.createObjectURL(myMediaSource);

  return (
    <Router>
      <div className="App wrapper">
        <Header />
        <div>
          <video
            src={url}
            controls={true}
            width="1000"
            height="auto"
          />
        </div>
      </div>
    </Router>
  );
};
