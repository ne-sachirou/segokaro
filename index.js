// @flow
"use strict";

const { app, BrowserWindow, session } = require("electron");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 480,
    minHeight: 270,
    acceptFirstMouse: true
    // titleBarStyle: "hidden",
    // frame: false
  });
  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => createWindow());

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow) createWindow();
});
