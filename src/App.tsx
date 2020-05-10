import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { checkPreviousSession } from "./utils/session";
import store from "./utils/store";

//** JSX Components **//
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { PrivateRoute } from "./PrivateRoute";
import { Landing } from "./pages/Landing";
import { ErrorInjector } from "./components/InjectorError";
import { ActivateAccount } from "./pages/auth/ActivateAccount";
import { SuccessInjector } from "./components/InjectorSuccess";
import { SendActivation } from "./pages/auth/SendActivation";
import { Home } from "./pages/app/Home";
import "./App.scss";

checkPreviousSession();

export const App = () => {
  return (
    <Provider store={store}>
      <SuccessInjector />
      <ErrorInjector />
      <Router>
        <div className="App wrapper">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/activate-account" component={ActivateAccount} />
            <Route exact path="/send-activation" component={SendActivation} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/app" component={Home} />
            <Route path="*" component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};
