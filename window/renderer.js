function crate_buttons(data){
    data.forEach(e=>{
        console.log(e);
        // Creează un element de tip buton
        var button = document.createElement("button");
        
        // Adaugă textul butonului
        button.textContent = e.Sectia;
        button.style="font-size:40px"
        // Adaugă o clasă (opțional)
        button.className = "btn border";
        // Adaugă un eveniment de click
            button.addEventListener("click", function() {
            fetchDataAndDisplayTable(e.Sectia);
            document.getElementById("x").style="display:none";
            document.getElementById('element-de-ascuns').style.display = 'block';
             // Afișează elementul
        });
        
        // Adaugă butonul la un element existent din DOM (de exemplu, body)
        document.getElementById("x").appendChild(button);
        
    })
    }


async function getsectie(){
    try{

        const response = await fetch(`/api/sectii`);
        if (!response.ok) {
            throw new Error('Eroare la obținerea datelor');
        }
        const data = await response.json();
        console.log(data);
        crate_buttons(data);
    }
     catch (error) {
        console.error('Eroare:', error);
}
}
getsectie();
function goToMainPage() {
    window.location.href = '/'; // Navigare la ruta principală
}
    async function fetchDataAndDisplayTable(criteriu) {
        try {
            const response = await fetch(`/api/data/${criteriu}`);
            if (!response.ok) {
                throw new Error('Eroare la obținerea datelor');
            }
            const data = await response.json();
    
            const tableContainer = document.getElementById('table-container');
            const tableHtml = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Secția</th>
                            <th scope="col">Etajul</th>
                            <th scope="col">Cabinetul</th>
                            <th scope="col">Functia</th>
                            <th scope="col">---</th>
                            <th scope="col">---</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(row => `<tr><td>${row.Sectia}</td><td>${row.Col3}</td><td>${row.Col3}</td><td>${row.Functia}</td></tr>`).join('')}
                    </tbody>
                </table>
            `;
            tableContainer.innerHTML = tableHtml;
        } catch (error) {
            console.error('Eroare:', error);
        }
    }
    
    // Adăugare eveniment de click pentru butoane
 
    
