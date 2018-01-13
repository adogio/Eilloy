import { app, BrowserWindow, Event, ipcMain } from "electron";
import debug from '../config/debug';

let win: BrowserWindow;
let mainEvent: Event;

const createWindow: () => void = () => {
    if (debug.isDebug) {
        win = new BrowserWindow({
            width: 1200,
            height: 1020,
            show: false,
            backgroundColor: '#01FF70',
        });
        win.loadURL("http://localhost:8080");
        win.webContents.openDevTools();
    } else {
        win = new BrowserWindow({
            width: 765,
            height: 1020,
            show: false,
            backgroundColor: '#01FF70',
        });
        win.loadURL(`file://${__dirname}/../renderer/index.html`);
        win.webContents.openDevTools();
    }
    win.webContents.on('new-window', (event: Electron.Event, url: string) => {
        event.preventDefault();
        mainEvent.sender.send('blocked-open', url);
    });
    win.on("closed", (): void => win = null);
    win.on("ready-to-show", (): void => {
        win.show();
        win.focus();
    });
};

ipcMain.on('main-register', (event: Event, arg: any) => {
    mainEvent = event;
});

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
