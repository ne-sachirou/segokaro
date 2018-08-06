"use strict";

import produce from "immer";
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import type { LocalFontObject } from "../font_manager";
import type { Action, State } from "../reducer";

type Prop = {
  fontFamily: LocalFontObject[],
  addFontFamily: string => Dispatch<Action>,
  deleteFontFamily: string => Dispatch<Action>
};

class FontFamilySetting extends Component<Prop, { isFontFamilyAdding: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      isFontFamilyAdding: false
    };
    this.newFontFamily = React.createRef();
  }

  render() {
    const { deleteFontFamily, fontFamily } = this.props;
    return (
      <div>
        <label>font-family</label>
        <button onClick={this.onClickStartAddingFontFalimy.bind(this)}>+</button>
        <ol>
          {this.state.isFontFamilyAdding ? (
            <li onDrop={this.onDrop.bind(this)}>
              <button onClick={this.onClickStopAddingFontFamily.bind(this)}>-</button>
              <input
                type="text"
                size="80"
                placeholder="Input a font name or drag & drop a font file"
                autoFocus={true}
                ref={this.newFontFamily}
              />
              <button onClick={this.onClickAddFontFamily.bind(this)}>✓</button>
            </li>
          ) : null}
          {fontFamily.map(fontFamily => (
            <li key={fontFamily.screenName}>
              <button onClick={() => deleteFontFamily(fontFamily)}>-</button>
              <button>↑</button>
              <button>↓</button>
              <span>{fontFamily.screenName}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  onClickAddFontFamily() {
    this.props.addFontFamily(this.newFontFamily.current.value);
    this.setState(state =>
      produce(state, state => {
        state.isFontFamilyAdding = false;
      })
    );
  }

  onClickStartAddingFontFalimy() {
    this.setState(state =>
      produce(state, state => {
        state.isFontFamilyAdding = true;
      })
    );
  }

  onClickStopAddingFontFamily() {
    this.setState(state =>
      produce(state, state => {
        state.isFontFamilyAdding = false;
      })
    );
  }

  onDrop(event) {
    this.newFontFamily.current.value = event.dataTransfer.files[0].path;
  }
}

function mapStateToProps(state: State) {
  return { fontFamily: state.Setting.fontFamily };
}

function mapDispatchToProps(dispatch) {
  return {
    addFontFamily: value => dispatch({ type: "Setting.addFontFamily", value: value }),
    deleteFontFamily: fontFamily => dispatch({ type: "Setting.deleteFontFamily", value: fontFamily })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FontFamilySetting);
