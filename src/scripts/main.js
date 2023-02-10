const { app, BrowserWindow, ipcMain } = require('electron')
path = require('path')
fs = require('fs')
console = require('console')

const createWindow = () => {
    const win = new BrowserWindow({
        fullscreen: true,
        frame: false,
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

function loadUserData(event) {
    userDataFile = path.join(__dirname, '../', '../', 'user_data.json')
    userDataFile = "C:/Users/abu/tsa-education-app/user_data.json"
    rawData = fs.readFileSync(userDataFile)
    userData = JSON.parse(rawData)
    event.returnValue = userData
}

function print(event, message) {
    console.log(message)
}

app.whenReady().then(() => {
    ipcMain.on('load-html', loadHTML)
    ipcMain.on('load-user-data', loadUserData)
    ipcMain.on('print', print)
    createWindow()
})
