"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immer = _interopRequireDefault(require("immer"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _font_family_setting = _interopRequireDefault(require("./font_family_setting"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Setting extends _react.Component {
  render() {
    const {
      fontSize,
      fontStyle,
      fontWeight,
      letterSpacing,
      onChangeFontSize,
      onChangeFontStyle,
      onChangeFontWeight,
      onChangeLetterSpacing
    } = this.props;
    const fontSizeNumber = parseFloat(fontSize);
    const letterSpacingNumber = parseFloat(letterSpacing);
    return _react.default.createElement("div", null, _react.default.createElement("div", null, _react.default.createElement("label", {
      htmlFor: "font-size"
    }, "font-size"), _react.default.createElement("input", {
      type: "range",
      id: "font-size",
      min: "5",
      max: "128",
      step: "0.5",
      defaultValue: fontSizeNumber,
      onChange: event => onChangeFontSize(event)
    }), _react.default.createElement("span", null, fontSize)), _react.default.createElement("div", null, _react.default.createElement("label", {
      htmlFor: "font-weight"
    }, "font-weight"), _react.default.createElement("input", {
      type: "range",
      id: "font-weight",
      min: "100",
      max: "1000",
      step: "100",
      defaultValue: fontWeight,
      onChange: event => onChangeFontWeight(event)
    }), _react.default.createElement("span", null, fontWeight)), _react.default.createElement("div", null, _react.default.createElement("label", {
      htmlFor: "font-style"
    }, "font-style"), _react.default.createElement("select", {
      id: "font-style",
      defaultValue: fontStyle,
      onChange: event => onChangeFontStyle(event)
    }, _react.default.createElement("option", {
      value: "normal"
    }, "normal"), _react.default.createElement("option", {
      value: "italic"
    }, "italic"))), _react.default.createElement("div", null, _react.default.createElement("label", {
      htmlFor: "letter-spacing"
    }, "letter-spacing"), _react.default.createElement("input", {
      type: "range",
      id: "letter-spacing",
      min: "-10",
      max: "10",
      step: "0.1",
      defaultValue: letterSpacingNumber,
      onChange: event => onChangeLetterSpacing(event)
    }), _react.default.createElement("span", null, letterSpacing)), _react.default.createElement(_font_family_setting.default, null));
  }

}

function mapStateToProps(state) {
  return state.Setting;
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeFontSize: event => dispatch({
      type: "Setting.changeFontSize",
      value: event.target.value
    }),
    onChangeFontStyle: event => dispatch({
      type: "Setting.changeFontStyle",
      value: event.target.value
    }),
    onChangeFontWeight: event => dispatch({
      type: "Setting.changeFontWeight",
      value: event.target.value
    }),
    onChangeLetterSpacing: event => dispatch({
      type: "Setting.changeLetterSpacing",
      value: event.target.value
    })
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Setting);

exports.default = _default;
