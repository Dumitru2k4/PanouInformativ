const { contextBridge, ipcRenderer } = require('electron/renderer')

let lastinput = "";



ipcRenderer.on('test', (event,char) => {
    if (char=="!"){
        document.querySelector(lastinput).value= document.querySelector(lastinput).value.slice(0, -1);
     }
     else{
        document.querySelector(lastinput).value +=char;
     }

     const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
     document.querySelector(lastinput).dispatchEvent(inputEvent);
     
});
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
ipcRenderer.send('page_click', selector)
lastinput=selector;

if (lastinput.includes(":")){
    lastinput=lastinput.replace(/:/g, "\\:");
}
//afiseaza input
//console.log(lastinput);

})
ipcRenderer.send('page_loaded') 


