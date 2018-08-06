// @flow
"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import App from "./components/app";
import reducer from "./reducer";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);
document.addEventListener("dragover", (event => event.preventDefault(): DragEventListener));
document.addEventListener("drop", (event => event.preventDefault(): DragEventListener));
window.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (app) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      app
    );
  } else {
    throw new Error("There's no #app node.");
  }
});
