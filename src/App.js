import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./pages/routes";

function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading . . .</div>}>
        <Switch>
          {routes.map(({ component: Component, path, ...rest }, key) => {
            return (
              <Route path={path} key={key}>
                <Component {...rest} />
              </Route>
            );
          })}
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
