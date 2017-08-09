/**
 * Created by Shashi on 5/8/17.
 */

"use strict";

const electron = require('electron');
// app module controls your application lifecycle
const app = electron.app;
// Browser window module allows native window creation
const browserWindow = electron.BrowserWindow;

// Keep a global reference of the window object.
// otherwise when JS object is grabage collected, window will close.
let mainWindow;

app.on('ready', onReady);

function onReady() {
    mainWindow = new browserWindow({
        height: 600,
        width : 600
    });

    mainWindow.loadURL('file://' + __dirname + '/../app/index.html');

    // opens up the dev tools
    //mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => onClosed);
}

function onClosed() {
    mainWindow = null;
}