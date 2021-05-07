import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/dashboard">
          <Dashboard />
        </Route>

        <Route></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
