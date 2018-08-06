"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFrameComponent = _interopRequireDefault(require("react-frame-component"));

var _reactRedux = require("react-redux");

require("./viewer.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Viewer extends _react.Component {
  render() {
    const {
      Setting: {
        fontFamily,
        fontSize,
        fontStyle,
        fontWeight,
        letterSpacing
      },
      Viewer: {
        content
      },
      onChangeContent
    } = this.props;
    const outputStyle = `
    @font-face {
      font-family: "output";
      font-style: ${fontStyle};
      font-weight: ${fontWeight};
      src: ${fontFamily.map(fontFamily => fontFamily.fontFaceSrc).join(",")};
    }

    html, body, .frame-root, .frame-content, .output {
      height: 100%;
      width: 100%;
    }

    .output {
      font-family: "output";
      font-feature-settings: "calt";
      font-size: ${fontSize};
      font-variant-ligatures: contextual;
      letter-spacing: ${letterSpacing};
      white-space: pre-line;
    }
    `;
    return _react.default.createElement("div", {
      className: "src-components-___viewer__viewer___2N567"
    }, _react.default.createElement("div", {
      className: "src-components-___viewer__input___3w7OH"
    }, _react.default.createElement("textarea", {
      defaultValue: content,
      onChange: event => onChangeContent(event),
      className: "src-components-___viewer__input__body___1ypSh"
    })), _react.default.createElement("div", {
      className: "src-components-___viewer__output___3iaKX"
    }, _react.default.createElement(_reactFrameComponent.default, {
      head: _react.default.createElement("style", null, outputStyle)
    }, _react.default.createElement("div", {
      className: "output"
    }, content))));
  }

}

function mapStateToProps(state) {
  const {
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    letterSpacing
  } = state.Setting;
  return {
    Setting: {
      fontFamily,
      fontSize,
      fontStyle,
      fontWeight,
      letterSpacing
    },
    Viewer: state.Viewer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeContent: event => {
      dispatch({
        type: "Viewer.changeContent",
        value: event.target.value
      });
    }
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Viewer);

exports.default = _default;
