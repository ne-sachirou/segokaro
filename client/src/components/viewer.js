// @flow
"use strict";

import React, { Component } from "react";
import Frame from "react-frame-component";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import type { LocalFontObject } from "../font_manager";
import type { Action, State } from "../reducer";
import "./viewer.css";

type Prop = {
  Setting: {
    fontFamily: LocalFontObject[],
    fontSize: string,
    fontStyle: string,
    fontWeight: number,
    letterSpacing: string
  },
  Viewer: {
    content: string
  },
  onChangeContent: Event => Dispatch<Action>
};

class Viewer extends Component<Prop> {
  render() {
    const {
      Setting: { fontFamily, fontSize, fontStyle, fontWeight, letterSpacing },
      Viewer: { content },
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
    return (
      <div styleName="viewer">
        <div styleName="input">
          <textarea defaultValue={content} onChange={event => onChangeContent(event)} styleName="input__body" />
        </div>
        <div styleName="output">
          <Frame head={<style>{outputStyle}</style>}>
            <div className="output">{content}</div>
          </Frame>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  const { fontFamily, fontSize, fontStyle, fontWeight, letterSpacing } = state.Setting;
  return {
    Setting: { fontFamily, fontSize, fontStyle, fontWeight, letterSpacing },
    Viewer: state.Viewer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeContent: event => {
      dispatch({ type: "Viewer.changeContent", value: event.target.value });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer);
