const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 600,
  });

  const url = isDev ? "http://localhost:3000" : "dummyUrl";
  win.loadURL(url);
}

app.whenReady().then(() => {
  createWindow();
});
