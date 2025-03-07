import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";
import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
// const Header = lazy(() => import("./components/Header"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
      if (isSignedIn) {
          history.push('/products');
      }
  }, [isSignedIn]);

  return (
      <BrowserRouter>
          <StylesProvider generateClassName={generateClassName}>
              <div>
                  <Header
                      signedIn={isSignedIn}
                      onSignOut={() => setIsSignedIn(false)}
                  />
                  <Suspense fallback={<Progress />}>
                      <Switch>
                          <Route path="/auth">
                              <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                          </Route>
                          <Route path="/" component={MarketingLazy} />
                      </Switch>
                  </Suspense>
              </div>
          </StylesProvider>
      </BrowserRouter>
  );
};
