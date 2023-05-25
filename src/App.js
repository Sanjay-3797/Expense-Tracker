import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home";
import AuthContext from "./store/auth-context";
import MainNavigation from "./components/MainNavigation";
import Profile from "./components/Profile";
import MainPage from "./components/MainPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>
        {authCtx.isLoggedIn && (
          <Route path="/home">
            <Home />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/profile">
            <Profile />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/main">
            <MainPage />
          </Route>
        )}
      </Switch>
    </React.Fragment>
  );
}

export default App;
