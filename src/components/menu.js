// @flow
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import type { Action, State } from "../reducer";
import "./menu.css";

type Prop = {
  focus: string,
  onClickSetting: () => Dispatch<Action>
};

export class Menu extends Component<Prop> {
  render() {
    const { focus, onClickSetting } = this.props;
    return (
      <div styleName="menu">
        <div onClick={() => onClickSetting()} styleName="menuItem">
          設定
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return state.Menu;
}

function mapDispatchToProps(dispatch) {
  return {
    onClickSetting: () => dispatch({ type: "Menu.clickSetting" })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
