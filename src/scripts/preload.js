const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    loadHTML: (filename) => ipcRenderer.send('load-html', filename),
});