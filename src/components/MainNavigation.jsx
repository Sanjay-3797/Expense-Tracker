import { Link, useHistory } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/index";

const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const premium = useSelector((state) => state.premium);
  const theme = useSelector((state) => state.theme);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };

  const premiumHandler = () => {
    dispatch(authActions.activatePremiumButton());
  };

  return (
    <header
      className={classes.header}
      style={{ backgroundColor: theme ? "black" : "#38015c" }}
    >
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
          {isLoggedIn && premium && (
            <li>
              <button
                onClick={premiumHandler}
                style={{ color: "gold", borderColor: "gold" }}
              >
                Premium
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
