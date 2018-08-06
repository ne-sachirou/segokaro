"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

require("./app.css");

var _menu = _interopRequireDefault(require("./menu"));

var _setting = _interopRequireDefault(require("./setting"));

var _viewer = _interopRequireDefault(require("./viewer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class App extends _react.Component {
  render() {
    const {
      focus
    } = this.props;

    const mainComponent = {
      Setting: _react.default.createElement(_setting.default, null),
      Viewer: _react.default.createElement(_viewer.default, null)
    }[focus] || _react.default.createElement(_viewer.default, null);

    return _react.default.createElement("div", {
      className: "src-components-___app__app___bQFt4"
    }, _react.default.createElement("div", {
      className: "src-components-___app__menuBar___z2bqd"
    }, _react.default.createElement(_menu.default, null)), _react.default.createElement("div", {
      className: "src-components-___app__main___3qa_f"
    }, mainComponent));
  }

}

function mapStateToProps(state) {
  return {
    focus: state.Menu.focus
  };
}

var _default = App = (0, _reactRedux.connect)(mapStateToProps)(App);

exports.default = _default;
