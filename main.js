const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('fs');
const { exec } = require('child_process');
let loadedURL;
let mainWindow;
let InfoWindow
let loadingWindow;
let keyboardWindow;
let loadTimeout;
let keyboardTimeout;

const mainWindow_width = 1920;
const mainWindow_height = 1080 - 215;

function create_mainWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: mainWindow_height,
        minWidth: 0,
        minHeight: 0,
        x: 0,
        y: 98,
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
    mainWindow.loadURL('http://10.0.0.17:3000/')
    mainWindow.on('click', (event, { x, y }) => {
        console.log(`Clic realizat în poziția (${x}, ${y})`);
    })
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
    ipcMain.on('tarife', (event) => {
        loadingWindow.show();
        mainWindow.loadFile(path.join(__dirname, '/tarife/index.html'))
        lastTime = new Date();
    })

    ipcMain.on('page_loaded', () => {
        //console.log("page_loaded"); //verificare daca sa incarcat pagina
        ascundere();
    })


    ipcMain.on('page_click', (event, title) => {
        lastTime = new Date();
        // console.log(title);
        if (title.includes("input")) {
            afisare();

        }
        else {
            ascundere();

        }
    })


    ipcMain.on('closekey', (event, title) => {
        ascundere();

    })
    ipcMain.on('addtext', (event, char) => {
        //console.log(char);
        mainWindow.webContents.send('test', char);
        lastTime = new Date();
    })
}

function ascundere() {
    keyboardWindow.hide();
    mainWindow.setResizable(true)
    mainWindow.setSize(mainWindow_width, mainWindow_height, false);
    mainWindow.setResizable(false)
}
function afisare() {
    console.log("222")
    mainWindow.setResizable(true)
    mainWindow.setSize(mainWindow_width - 430, mainWindow_height, false);
    mainWindow.setResizable(false)
    keyboardWindow.show();
}
//#endregion

//#region  windowsCreator
function create_tabWindow() {
    let secondaryWindow = new BrowserWindow({
        width: 1920,
        height: 110,
        x: 0,
        y: 970,
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
//info window
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
        height: mainWindow_height,
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
        height: mainWindow_height,
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

        if (milis > 1000 * 60 * 2) {

            console.log("Revenim la pagina principala");
            ascundere();
            mainWindow.loadURL('http://10.0.0.17:3000/');
            lastTime = new Date();
        }
        console.log("Sa resetat timerul de 3 minute");
        //clearTimeout(loadTimeout);
    }, 1000 * 60 * 3);
    app.on('window-all-closed', () => {
        app.quit()
    })
    mainWindow.on('closed', () => {
        app.quit();
    });
})