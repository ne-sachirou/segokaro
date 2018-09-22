"use strict";

import produce from "immer";
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import type { Action, State } from "../reducer";

type Prop = {
  fontFamily: string[],
  addFontFamily: string => Dispatch<Action>,
  addFontFile: string => Dispatch<Action>,
  deleteFontFamily: string => Dispatch<Action>
};

class FontFamilySetting extends Component<Prop, { isFontFamilyAdding: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      isFontFamilyAdding: false
    };
    this.newFontFile = React.createRef();
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
              <div>
                Select a font you make : <input type="file" size="80" ref={this.newFontFile} />
              </div>
              <div>
                Input a installed font name :{" "}
                <input
                  type="text"
                  size="80"
                  placeholder="Input a installed font name."
                  autoFocus={true}
                  ref={this.newFontFamily}
                />
              </div>
              <button onClick={this.onClickAddFontFamily.bind(this)}>✓</button>
            </li>
          ) : null}
          {fontFamily.map(fontFamily => (
            <li key={fontFamily}>
              <button onClick={() => deleteFontFamily(fontFamily)}>-</button>
              <button>↑</button>
              <button>↓</button>
              <span>{fontFamily}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  onClickAddFontFamily() {
    const newFontFile = this.newFontFile.current.value.trim();
    const newFontFamily = this.newFontFamily.current.value.trim();
    if (newFontFile != "" && newFontFamily == "") {
      this.props.addFontFile(newFontFile);
    } else if (newFontFile == "" && newFontFamily != "") {
      this.props.addFontFamily(newFontFamily);
    } else {
      console.error("Both font file & font family are set.");
    }
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
    this.newFontFamily.current.value = event.dataTransfer.files[0].name;
  }
}

function mapStateToProps(state: State) {
  return { fontFamily: state.Setting.fontFamily };
}

function mapDispatchToProps(dispatch) {
  return {
    addFontFamily: value => dispatch({ type: "Setting.addFontFamily", value: value }),
    addFontFile: value => dispatch({ type: "Setting.addFontFile", value: value }),
    deleteFontFamily: fontFamily => dispatch({ type: "Setting.deleteFontFamily", value: fontFamily })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FontFamilySetting);
