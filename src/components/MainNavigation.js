import { Link, useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/main">Tracker</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
