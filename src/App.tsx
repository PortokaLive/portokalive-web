import React from "react";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { NotFound } from "./NotFound";
import Entry from "./components/Entry";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./utils/actions/actionUser";
import { PrivateRoute } from "./PrivateRoute";
import "./App.scss";
import { Landing } from "./pages/Landing";

if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token") || "";
  const decoded = jwt_decode<any>(token);
  store.dispatch(setCurrentUser(decoded));
  const currenDate = Date.now() / 1000;

  if (decoded.exp < currenDate) {
    logoutUser();
    window.location.href = "./login";
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App wrapper">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/app" component={Entry} />
            <PrivateRoute path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
