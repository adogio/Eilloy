import { app, BrowserWindow } from "electron";

let win: BrowserWindow;
const dirName: string = __dirname;
const env: string = "dev";
// const env: string = "production";

const createWindow: () => void = () => {
    if (env === 'dev') {
        win = new BrowserWindow({
            width: 1200,
            height: 1020,
            show: false,
        });
        win.loadURL("http://localhost:8080");
        win.webContents.openDevTools();
    } else {
        win = new BrowserWindow({
            width: 765,
            height: 1020,
            show: false,
        });
        win.loadURL(`file://${dirName}/../renderer/index.html`);
    }
    win.on("closed", (): void => win = null);
    win.on("ready-to-show", (): void => {
        win.show();
        win.focus();
    });
};

app.on("ready", () => {
    createWindow();
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});
