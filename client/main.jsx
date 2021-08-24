import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

const components = {
  simple: lazy(() => import("./Simple")),
  another: lazy(() => import("./Another")),
};

const appOpts = window.SS_REACT_APPS || [];

appOpts.forEach((opts) => {
  const { id = "", name = "", props = {} } = opts;

  const Component = components[name];
  const root = document.getElementById(id);

  if (root && Component) {
    ReactDOM.render(
      <React.StrictMode>
        <Suspense fallback={<span></span>}>
          <Component {...props} />
        </Suspense>
      </React.StrictMode>,
      root
    );
  }
});
