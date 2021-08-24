import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

const components = {
  simple: lazy(() => import("./simple/Simple")),
};

const appOpts = window.SS_REACT_APPS || [];

appOpts.forEach((opts) => {
  const { id = "", name = "", initialState = {} } = opts;

  const Component = components[name];
  const root = document.getElementById(id);

  if (root && Component) {
    ReactDOM.render(
      <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
          <Component {...initialState} />
        </Suspense>
      </React.StrictMode>,
      root
    );
  }
});
