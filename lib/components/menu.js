"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Menu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

require("./menu.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Menu extends _react.Component {
  render() {
    const {
      focus,
      onClickSetting
    } = this.props;
    return _react.default.createElement("div", {
      className: "src-components-___menu__menu___wk2Pg"
    }, _react.default.createElement("div", {
      onClick: () => onClickSetting(),
      className: "src-components-___menu__menuItem___1EQ8C"
    }, "\u8A2D\u5B9A"));
  }

}

exports.Menu = Menu;

function mapStateToProps(state) {
  return state.Menu;
}

function mapDispatchToProps(dispatch) {
  return {
    onClickSetting: () => dispatch({
      type: "Menu.clickSetting"
    })
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Menu);

exports.default = _default;
