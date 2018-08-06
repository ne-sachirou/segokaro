"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _immer = _interopRequireDefault(require("immer"));

var _react = _interopRequireWildcard(require("react"));

var _font_manager = _interopRequireWildcard(require("./font_manager"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  Menu: {
    focus: "Viewer"
  },
  Setting: {
    fontFamily: [new _font_manager.LocalFontObject("Source Sans Pro"), new _font_manager.LocalFontObject("Helvetica Neue"), new _font_manager.LocalFontObject("Helvetica"), new _font_manager.LocalFontObject("Arial"), new _font_manager.LocalFontObject("ヒラギノ角ゴ ProN W3"), new _font_manager.LocalFontObject("Hiragino Kaku Gothic ProN"), new _font_manager.LocalFontObject("Meiryo")],
    fontSize: "10.5pt",
    fontStyle: "normal",
    fontWeight: 400,
    letterSpacing: "0pt"
  },
  Viewer: {
    content: ["あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。", "いろはにほへと　ちりぬるを　わかよたれそ　つねならむ　うゐのおくやま　けふこえて　あさきゆめみし　ゑひもせす"].join("\n")
  }
};

function reducer(state, action) {
  const reducer = {
    "Menu.clickSetting": Menu_clickSetting,
    "Setting.addFontFamily.success": Setting_addFontFamily_success,
    "Setting.deleteFontFamily": Setting_deleteFontFamily,
    "Setting.changeFontSize": Setting_changeFontSize,
    "Setting.changeFontStyle": Setting_changeFontStyle,
    "Setting.changeFontWeight": Setting_changeFontWeight,
    "Setting.changeLetterSpacing": Setting_changeLetterSpacing,
    "Viewer.changeContent": Viewer_changeContent
  }[action.type];
  if (reducer) return reducer(state, action);
  return state || initialState;
}

function Menu_clickSetting(state, action) {
  return (0, _immer.default)(state, state => {
    state.Menu.focus = state.Menu.focus === "Setting" ? "Viewer" : "Setting";
  });
}

function Setting_addFontFamily_success(state, action) {
  if (state.Setting.fontFamily.includes(action.value)) return state;
  return (0, _immer.default)(state, state => {
    state.Setting.fontFamily.unshift(action.value);
  });
}

function Setting_deleteFontFamily(state, action) {
  new _font_manager.default().unregister(action.value);
  return (0, _immer.default)(state, state => {
    state.Setting.fontFamily = state.Setting.fontFamily.filter(fontFamily => fontFamily.screenName !== action.value);
  });
}

function Setting_changeFontSize(state, action) {
  return (0, _immer.default)(state, state => {
    state.Setting.fontSize = `${action.value}pt`;
  });
}

function Setting_changeFontStyle(state, action) {
  return (0, _immer.default)(state, state => {
    state.Setting.fontStyle = action.value;
  });
}

function Setting_changeFontWeight(state, action) {
  return (0, _immer.default)(state, state => {
    state.Setting.fontWeight = parseInt(action.value);
  });
}

function Setting_changeLetterSpacing(state, action) {
  return (0, _immer.default)(state, state => {
    state.Setting.letterSpacing = `${action.value}pt`;
  });
}

function Viewer_changeContent(state, action) {
  return (0, _immer.default)(state, state => {
    state.Viewer.content = action.value;
  });
}
