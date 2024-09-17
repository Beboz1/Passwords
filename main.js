const { app, BrowserWindow } = require('electron');
const path = require('path');
require('@electron/remote/main').initialize();

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    require('@electron/remote/main').enable(mainWindow.webContents);

    mainWindow.loadFile(path.join(__dirname, 'react-build', 'index.html'));

    mainWindow.webContents.openDevTools(); // Open DevTools for debugging
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
