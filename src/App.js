import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import pageRoutes from "./pages/routes";

function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading . . .</div>}>
        <Switch>
          {pageRoutes.map((route, key) => {
            return (
              <Route path={route.path} exact={route.exact} key={key}>
                <route.component />
              </Route>
            );
          })}
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
