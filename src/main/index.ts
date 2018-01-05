import { app, BrowserWindow } from 'electron';

const dirName: string = __dirname;
let win: BrowserWindow;

const createWindow = () => {
    win = new BrowserWindow({
        width: 700,
        height: 500,
        show: false,
    });
    win.loadURL(`file://${dirName}/dist/index.html`);
    win.webContents.openDevTools();
    win.on('closed', (): void => win = null)
    win.on('ready-to-show', (): void => {
        win.show()
        win.focus()
    })
}

app.on('ready', () => createWindow())
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
app.on('activate', () => win === null && createWindow())