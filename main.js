const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 650,
  });

  const url = isDev ? "http://localhost:3000" : "dummyUrl";
  win.loadURL(url);
}

app.whenReady().then(() => {
  createWindow();
});
