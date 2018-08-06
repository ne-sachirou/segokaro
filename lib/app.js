"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _redux = require("redux");

var _app = _interopRequireDefault(require("./components/app"));

var _reducer = _interopRequireDefault(require("./reducer"));

var _saga = _interopRequireDefault(require("./saga"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sagaMiddleware = (0, _reduxSaga.default)();
const store = (0, _redux.createStore)(_reducer.default, (0, _redux.applyMiddleware)(sagaMiddleware));
sagaMiddleware.run(_saga.default);
document.addEventListener("dragover", event => event.preventDefault());
document.addEventListener("drop", event => event.preventDefault());
window.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (app) {
    _reactDom.default.render(_react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_app.default, null)), app);
  } else {
    throw new Error("There's no #app node.");
  }
});
