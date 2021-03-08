import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import pageRoutes from "./pages/routes";
import CustomBackDrop from "./components/BackDrop/CustomBackDrop";

function App() {
  return (
    <Router>
      <React.Suspense fallback={<CustomBackDrop />}>
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
