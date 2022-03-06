import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./routes";

export default function Router() {
  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
