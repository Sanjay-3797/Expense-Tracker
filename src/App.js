import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home";
import AuthContext from "./store/auth-context";
import MainNavigation from "./components/MainNavigation";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>
          <Route path="/home">
            <Home />
          </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
