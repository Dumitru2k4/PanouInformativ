const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    btns_click: (page) => ipcRenderer.send('btns_click', page),
    contacte: () => ipcRenderer.send('contacte'),
    tarife: () => ipcRenderer.send('tarife'),
    acasa: () => ipcRenderer.send('acasa'),
});