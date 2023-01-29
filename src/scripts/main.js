const { app, BrowserWindow, ipcMain } = require('electron')
path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        icon: path.join(__dirname, '../', '../', 'images/LoveToLearn.ico')
    })

    win.loadFile('src/html/homepage.html')
} 

function loadHTML(event, name) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.loadFile('src/html/' + name + '.html')
}

app.whenReady().then(() => {
    ipcMain.on('load-html', loadHTML)
    createWindow()
})