function filterFunction() {
    var filter, ul, li, b, i;
    var input = document.getElementById("cautamedic");
    filter = input.value.toUpperCase();
    var div = document.getElementById("dropdown");
    var b = div.getElementsByTagName("b");
    for (i = 0; i < b.length; i++) {
      var txtValue = b[i].textContent || b[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        b[i].style.display = "";
      } else {
        b[i].style.display = "none";
      }
    }
  }
  

document.addEventListener('DOMContentLoaded', function() {
    var dropdownItems = document.querySelectorAll('.dropdown-content b');
    
    dropdownItems.forEach(function(item) {
      item.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        
        // Toggle the 'clicked' class
        if (item.classList.contains('clicked')) {
          item.classList.remove('clicked');
        } else {
          // Remove the 'clicked' class from all items
          dropdownItems.forEach(function(item) {
            item.classList.remove('clicked');
          });
          // Add the 'clicked' class to the clicked item
          item.classList.add('clicked');
        }
      });
    });
  });

  setInterval(filterFunction, 2000);