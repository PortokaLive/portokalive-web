import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/actionUser";

export const checkPreviousSession = () => {
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token") || "";
    const decoded = jwt_decode<any>(token);
    setCurrentUser(decoded);
    const currenDate = Date.now() / 1000;

    if (decoded.exp < currenDate) {
      logoutUser();
      window.location.href = "/login";
    }
  }
};
