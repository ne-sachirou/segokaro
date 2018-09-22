// @flow
"use strict";

import produce from "immer";
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import type { Action, State } from "../reducer";
import FontFamilySetting from "./font_family_setting";

type Prop = {
  fontSize: string,
  fontStyle: string,
  fontWeight: number,
  letterSpacing: string,
  onChangeFontSize: Event => Dispatch<Action>,
  onChangeFontStyle: Event => Dispatch<Action>,
  onChangeFontWeight: Event => Dispatch<Action>,
  onChangeLetterSpacing: Event => Dispatch<Action>
};

class Setting extends Component<Prop> {
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
    return (
      <div>
        <div>
          <label htmlFor="font-size">font-size</label>
          <input
            type="range"
            id="font-size"
            min="5"
            max="128"
            step="0.5"
            defaultValue={fontSizeNumber}
            onChange={event => onChangeFontSize(event)}
          />
          <span>{fontSize}</span>
        </div>
        <div>
          <label htmlFor="font-weight">font-weight</label>
          <input
            type="range"
            id="font-weight"
            min="100"
            max="1000"
            step="100"
            defaultValue={fontWeight}
            onChange={event => onChangeFontWeight(event)}
          />
          <span>{fontWeight}</span>
        </div>
        <div>
          <label htmlFor="font-style">font-style</label>
          <select id="font-style" defaultValue={fontStyle} onChange={event => onChangeFontStyle(event)}>
            <option value="normal">normal</option>
            <option value="italic">italic</option>
          </select>
        </div>
        <div>
          <label htmlFor="letter-spacing">letter-spacing</label>
          <input
            type="range"
            id="letter-spacing"
            min="-10"
            max="10"
            step="0.1"
            defaultValue={letterSpacingNumber}
            onChange={event => onChangeLetterSpacing(event)}
          />
          <span>{letterSpacing}</span>
        </div>
        <FontFamilySetting />
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return state.Setting;
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeFontSize: event =>
      dispatch({
        type: "Setting.changeFontSize",
        value: event.target.value
      }),
    onChangeFontStyle: event =>
      dispatch({
        type: "Setting.changeFontStyle",
        value: event.target.value
      }),
    onChangeFontWeight: event =>
      dispatch({
        type: "Setting.changeFontWeight",
        value: event.target.value
      }),
    onChangeLetterSpacing: event =>
      dispatch({
        type: "Setting.changeLetterSpacing",
        value: event.target.value
      })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
