const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    closekey: () => ipcRenderer.send('closekey'),
    addText:(char)=>ipcRenderer.send('addtext',char)
});