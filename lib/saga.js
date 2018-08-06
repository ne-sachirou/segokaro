"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saga;

var _effects = require("redux-saga/effects");

var _font_manager = _interopRequireDefault(require("./font_manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function* saga() {
  yield (0, _effects.takeEvery)("Setting.addFontFamily", Setting_addFontFamily);
}

function* Setting_addFontFamily(action) {
  let fontFamily = action.value.trim();

  if (fontFamily === "") {
    return null;
  }

  const fontObject = yield (0, _effects.call)(async () => {
    try {
      return await new _font_manager.default().register(fontFamily);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  yield (0, _effects.put)({
    type: "Setting.addFontFamily.success",
    value: fontObject
  });
}
