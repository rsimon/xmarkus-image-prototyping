const { app, BrowserWindow } = require('electron');
const fs = require('fs');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')

  // win.webContents.openDevTools();
}

const loadImage = () => {

  

}

app.whenReady().then(() => {
  createWindow();

  loadImage();
})