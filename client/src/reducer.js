// @flow
"use strict";

import produce from "immer";
import React, { Component } from "react";
import { call, put, takeEvery } from "redux-saga/effects";
import type { Effect } from "redux-saga";
import FontFile from "./font_file";

export type State = {
  Menu: { focus: string },
  Setting: {
    fontFamily: string[],
    fontSize: string,
    fontStyle: string,
    fontWeight: number,
    letterSpacing: string
  },
  Viewer: {
    content: string
  }
};

export type Action =
  | { type: "Menu.clickSetting" }
  | { type: "Setting.addFontFamily", value: string }
  | { type: "Setting.addFontFile", value: string }
  | { type: "Setting.deleteFontFamily", value: string }
  | { type: "Setting.changeFontSize", value: number }
  | { type: "Setting.changeFontStyle", value: string }
  | { type: "Setting.changeFontWeight", value: number }
  | { type: "Setting.changeLetterSpacing", value: number }
  | { type: "Viewer.changeContent", value: string };

const initialState: State = {
  Menu: { focus: "Viewer" },
  Setting: {
    fontFamily: [
      "Source Sans Pro",
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      "ヒラギノ角ゴ ProN W3",
      "Hiragino Kaku Gothic ProN",
      "Meiryo"
    ],
    fontSize: "10.5pt",
    fontStyle: "normal",
    fontWeight: 400,
    letterSpacing: "0pt"
  },
  Viewer: {
    content: [
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
      "いろはにほへと　ちりぬるを　わかよたれそ　つねならむ　うゐのおくやま　けふこえて　あさきゆめみし　ゑひもせす"
    ].join("\n")
  }
};

export function reducer(state: State, action: Action): State {
  const reducer = {
    "Menu.clickSetting": Menu_clickSetting,
    "Setting.addFontFamily": Setting_addFontFamily,
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

export function* saga(): Iterable<Effect> {
  yield takeEvery("Setting.addFontFile", Setting_addFontFile);
}

function Menu_clickSetting(state, action) {
  return produce(state, state => {
    state.Menu.focus = state.Menu.focus === "Setting" ? "Viewer" : "Setting";
  });
}

function Setting_addFontFamily(state, action) {
  const fontFamily = action.value;
  if (state.Setting.fontFamily.includes(fontFamily)) return state;
  return produce(state, state => {
    state.Setting.fontFamily.unshift(fontFamily);
  });
}

function* Setting_addFontFile(action) {
  const fontFile = FontFile.fromPath(action.value);
  try {
    yield call(fontFile.save.bind(fontFamily));
    yield put({ type: "Setting.addFontFile.success", value: action.value });
  } catch (err) {
    yield put({ type: "Setting.addFontFile.fail", error: err });
  }
}

function Setting_deleteFontFamily(state, action) {
  return produce(state, state => {
    state.Setting.fontFamily = state.Setting.fontFamily.filter(fontFamily => fontFamily !== action.value);
  });
}

function Setting_changeFontSize(state, action) {
  return produce(state, state => {
    state.Setting.fontSize = `${action.value}pt`;
  });
}

function Setting_changeFontStyle(state, action) {
  return produce(state, state => {
    state.Setting.fontStyle = action.value;
  });
}

function Setting_changeFontWeight(state, action) {
  return produce(state, state => {
    state.Setting.fontWeight = parseInt(action.value);
  });
}

function Setting_changeLetterSpacing(state, action) {
  return produce(state, state => {
    state.Setting.letterSpacing = `${action.value}pt`;
  });
}

function Viewer_changeContent(state, action) {
  return produce(state, state => {
    state.Viewer.content = action.value;
  });
}
