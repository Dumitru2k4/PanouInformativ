
function addText(char) {
  window.electronAPI.addText(char)
}

function backspace() {
  var searchBar = document.getElementById('search-bar');
  searchBar.value = searchBar.value.slice(0, -1);
}function closekey(){
  window.electronAPI.closekey()
      }