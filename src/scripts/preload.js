const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    print: (message) => ipcRenderer.send('print', message),
    loadHTML: (filename) => ipcRenderer.send('load-html', filename),
    loadUserData: () => ipcRenderer.sendSync('load-user-data'),
    saveUserData: (jsonData) => ipcRenderer.send('save-user-data', jsonData),
});
