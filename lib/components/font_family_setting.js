"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immer = _interopRequireDefault(require("immer"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FontFamilySetting extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFontFamilyAdding: false
    };
    this.newFontFamily = _react.default.createRef();
  }

  render() {
    const {
      deleteFontFamily,
      fontFamily
    } = this.props;
    return _react.default.createElement("div", null, _react.default.createElement("label", null, "font-family"), _react.default.createElement("button", {
      onClick: this.onClickStartAddingFontFalimy.bind(this)
    }, "+"), _react.default.createElement("ol", null, this.state.isFontFamilyAdding ? _react.default.createElement("li", {
      onDrop: this.onDrop.bind(this)
    }, _react.default.createElement("button", {
      onClick: this.onClickStopAddingFontFamily.bind(this)
    }, "-"), _react.default.createElement("input", {
      type: "text",
      size: "80",
      placeholder: "Input a font name or drag & drop a font file",
      autoFocus: true,
      ref: this.newFontFamily
    }), _react.default.createElement("button", {
      onClick: this.onClickAddFontFamily.bind(this)
    }, "\u2713")) : null, fontFamily.map(fontFamily => _react.default.createElement("li", {
      key: fontFamily.screenName
    }, _react.default.createElement("button", {
      onClick: () => deleteFontFamily(fontFamily)
    }, "-"), _react.default.createElement("button", null, "\u2191"), _react.default.createElement("button", null, "\u2193"), _react.default.createElement("span", null, fontFamily.screenName)))));
  }

  onClickAddFontFamily() {
    this.props.addFontFamily(this.newFontFamily.current.value);
    this.setState(state => (0, _immer.default)(state, state => {
      state.isFontFamilyAdding = false;
    }));
  }

  onClickStartAddingFontFalimy() {
    this.setState(state => (0, _immer.default)(state, state => {
      state.isFontFamilyAdding = true;
    }));
  }

  onClickStopAddingFontFamily() {
    this.setState(state => (0, _immer.default)(state, state => {
      state.isFontFamilyAdding = false;
    }));
  }

  onDrop(event) {
    this.newFontFamily.current.value = event.dataTransfer.files[0].path;
  }

}

function mapStateToProps(state) {
  return {
    fontFamily: state.Setting.fontFamily
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFontFamily: value => dispatch({
      type: "Setting.addFontFamily",
      value: value
    }),
    deleteFontFamily: fontFamily => dispatch({
      type: "Setting.deleteFontFamily",
      value: fontFamily
    })
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FontFamilySetting);

exports.default = _default;
