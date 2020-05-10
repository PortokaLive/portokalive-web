import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/actionUser";

export const checkPreviousSession = (history: any) => {
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token") || "";
    const decoded = jwt_decode<any>(token);
    setCurrentUser(decoded);
    const currenDate = Date.now() / 1000;
    history.push("/app");

    if (decoded.exp < currenDate) {
      logoutUser();
      history.push("/");
    }
  }
};
