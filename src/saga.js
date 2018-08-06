// @flow
"use strict";

import { call, put, takeEvery } from "redux-saga/effects";
import type { Effect } from "redux-saga";
import FontManager from "./font_manager";
import type { Action } from "./reducer";

export default function* saga(): Iterable<Effect> {
  yield takeEvery("Setting.addFontFamily", Setting_addFontFamily);
}

function* Setting_addFontFamily(action: Action) {
  let fontFamily = action.value.trim();
  if (fontFamily === "") {
    return null;
  }
  const fontObject = yield call(async () => {
    try {
      return await new FontManager().register(fontFamily);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  yield put({ type: "Setting.addFontFamily.success", value: fontObject });
}
