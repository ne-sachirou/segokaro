// @flow
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import type { State } from "../reducer";
import "./app.css";
import Menu from "./menu";
import Setting from "./setting";
import Viewer from "./viewer";

type Prop = { focus: string };

class App extends Component<Prop> {
  render() {
    const { focus } = this.props;
    const mainComponent = {
      Setting: <Setting />,
      Viewer: <Viewer />
    }[focus] || <Viewer />;
    return (
      <div styleName="app">
        <div styleName="menuBar">
          <Menu />
        </div>
        <div styleName="main">{mainComponent}</div>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return { focus: state.Menu.focus };
}

export default (App = connect(mapStateToProps)(App));
