const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('fs');
const { exec } = require('child_process');
let loadedURL;
let mainWindow;
let loadingWindow;
let loadTimeout;
let videoTimeout;
let keyboardTimeout;
// Funcție pentru a închide tastatura virtuală osk

const mainWindow_width = 1920;
const mainWindow_height = 1080;
let Keyboardwidth = 0;

function create_mainWindow() {
    mainWindow = new BrowserWindow({
        width: 1920 - Keyboardwidth,
        height: mainWindow_height - 200,
        x: 0,
        y: 100,
        resizable: false,
        modal: true,
        alwaysOnTop: true,
        frame: false, // Ascunde bara de titlu și butoanele de control
        webPreferences: {
            //  devTools: false, // Interzice deschiderea DevTools
            preload: path.join(__dirname, '/window/preload.js')
        }
    })
    // mainWindow.loadURL('https://amt-centru.md');
    //mainWindow.webContents.openDevTools();

    mainWindow.loadURL('http://localhost:3000/')
}
function events_mainWindows() {
    mainWindow.webContents.on('dom-ready', () => {
        loadingWindow.hide();
        clearTimeout(keyboardTimeout);
        clearTimeout(loadTimeout);




        /* mainWindow.webContents.executeJavaScript(`
             // Funcție pentru a obține selectorul unui element
                 function getSelector(element) {
                     if (!element) return 'null';
                     let selector = element.tagName.toLowerCase();
                     if (element.id) {
                         selector += '#' + element.id;
                         return selector;
                     }
                     if (element.className) {
                         selector += '.' + element.className.trim().replace(/\s+/g, '.');
                         return selector;
                     }
                     return selector;
                 }
                 
             document.addEventListener('click', function(event) {
                 console.log(event.target);
                 const selector = getSelector(event.target);
                 window.electronAPI.page_click(selector);
             })
             window.electronAPI.page_loaded();
           
             
             `);*/
    })
    //#region FUNCTII x
    ipcMain.on('btns_click', (event, title) => {
        loadingWindow.show();
        mainWindow.loadURL(title);
        lastTime = new Date();
    })
    ipcMain.on('contacte', (event) => {
        loadingWindow.show();
        mainWindow.loadFile(path.join(__dirname, '/contacte/index.html'))
        lastTime = new Date();
    })

    ipcMain.on('page_loaded', (event, title) => {
        console.log("page_loaded");
    })
    //#endregion


    ipcMain.on('page_click', (event, title) => {
        lastTime = new Date();
        // console.log(title);
        if (title.includes("input")) {
            afisare();
            Keyboardwidth = 430;
        }
        else {
            ascundere();
            Keyboardwidth = 0;


        }
    })


    ipcMain.on('closekey', (event, title) => {
        ascundere();

    })
    //tastatura
    ipcMain.on('addtext', (event, char) => {
        //console.log(char);
        mainWindow.webContents.send('test', char);
        lastTime = new Date();
    })
}

function ascundere() {
    keyboardWindow.hide();
}
function afisare() {
    keyboardWindow.show();
}

//#region  windowsCreator
function create_tabWindow() {
    let secondaryWindow = new BrowserWindow({
        width: 1920,
        height: 100,
        x: 0,
        y: 980,
        resizable: false,
        frame: false, // Ascunde bara de titlu și butoanele de control pentru fereastra secundară
        alwaysOnTop: true,
        webPreferences: {
            // devTools: false, // Interzice deschiderea DevTools

            preload: path.join(__dirname, '/tab/preload.js')
        }
    });

    // Încarcă o altă pagină HTML în fereastra secundară
    secondaryWindow.loadFile(path.join(__dirname, '/tab/index.html'));
    // secondaryWindow.webContents.openDevTools();
    // Atașăm un ascultător de eveniment pentru clicuri pe fereastra principală
    secondaryWindow.on('click', (event, { x, y }) => {
        console.log(`Clic realizat în poziția (${x}, ${y})`);
        // Poți face ce acțiuni ai nevoie aici în funcție de clic
    });

}
function create_infoWindow() {
    InfoWindow = new BrowserWindow({
        width: 1920,
        height: 100,
        x: 0,
        y: 0,
        resizable: false,
        frame: false, // Ascunde bara de titlu și butoanele de control pentru fereastra secundară
        alwaysOnTop: true,
        webPreferences: {
            // devTools: false, // Interzice deschiderea DevTools


        }
    });

    // Încarcă o altă pagină HTML în fereastra secundară
    InfoWindow.loadFile(path.join(__dirname, '/info/index.html'));
    // secondaryWindow.webContents.openDevTools();
    // Atașăm un ascultător de eveniment pentru clicuri pe fereastra principală
    InfoWindow.on('click', (event, { x, y }) => {
        console.log(`Clic realizat în poziția (${x}, ${y})`);
        // Poți face ce acțiuni ai nevoie aici în funcție de clic
    });

}

function create_keyboardWindow() {
    keyboardWindow = new BrowserWindow({
        width: 430,
        height: mainWindow_height - 200,
        x: mainWindow_width - 430,
        y: 100,
        resizable: false,
        frame: false, // Ascunde bara de titlu și butoanele de control pentru fereastra secundară
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            // devTools: false, // Interzice deschiderea DevTools

            preload: path.join(__dirname, '/keyboard/preload.js')
        }
    });

    // Încarcă o altă pagină HTML în fereastra secundară
    keyboardWindow.loadFile(path.join(__dirname, '/keyboard/index.html'));

    // secondaryWindow.webContents.openDevTools();
    // Atașăm un ascultător de eveniment pentru clicuri pe fereastra principală
    keyboardWindow.on('click', (event, { x, y }) => {
        console.log(`Clic realizat în poziția (${x}, ${y})`);
        // Poți face ce acțiuni ai nevoie aici în funcție de clic
    });

}


function create_loadingWindow() {
    // Creăm fereastra de încărcare
    loadingWindow = new BrowserWindow({
        width: 1920,
        height: mainWindow_height - 200,
        x: 0,
        y: 100,
        resizable: false,
        modal: true,
        parent: mainWindow,
        alwaysOnTop: true,
        frame: false,
        show: false
    });

    loadingWindow.loadFile('loading.html');
}

//#endregion 
app.on('window-all-closed', () => {
    app.quit()
})


let lastTime = new Date();
app.on('ready', () => {
    create_keyboardWindow();
    create_tabWindow();
    create_infoWindow();
    create_mainWindow();
    create_loadingWindow();
    events_mainWindows();

    setInterval(() => {

        let now = new Date();
        let milis = now - lastTime;

        if (milis > 1000 * 60 || mainWindow.webContents.getURL().includes('3000')) {

            console.log("a timp");
            keyboardWindow.hide();
            mainWindow.loadURL('http://localhost:3000/');
            lastTime = new Date();
        }
        console.log("a trecut timp");
        //clearTimeout(loadTimeout);
    }, 1000 * 60 * 3);
})

//Server