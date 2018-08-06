// @flow
"use strict";

import produce from "immer";
import React, { Component } from "react";
import FontManager, { LocalFontObject } from "./font_manager";
import type { RemoteFontObject } from "./font_manager";

export type State = {
  Menu: { focus: string },
  Setting: {
    fontFamily: (LocalFontObject | RemoteFontObject)[],
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
  | { type: "Setting.addFontFamily.success", value: LocalFontObject | RemoteFontObject }
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
      new LocalFontObject("Source Sans Pro"),
      new LocalFontObject("Helvetica Neue"),
      new LocalFontObject("Helvetica"),
      new LocalFontObject("Arial"),
      new LocalFontObject("ヒラギノ角ゴ ProN W3"),
      new LocalFontObject("Hiragino Kaku Gothic ProN"),
      new LocalFontObject("Meiryo")
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

export default function reducer(state: State, action: Action): State {
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
  return produce(state, state => {
    state.Menu.focus = state.Menu.focus === "Setting" ? "Viewer" : "Setting";
  });
}

function Setting_addFontFamily_success(state, action) {
  if (state.Setting.fontFamily.includes(action.value)) return state;
  return produce(state, state => {
    state.Setting.fontFamily.unshift(action.value);
  });
}

function Setting_deleteFontFamily(state, action) {
  new FontManager().unregister(action.value);
  return produce(state, state => {
    state.Setting.fontFamily = state.Setting.fontFamily.filter(fontFamily => fontFamily.screenName !== action.value);
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
