function main () {
    displayCart()
    emptyCart()
}

function displayCart() {
    let totalPrice = 0
    for (let i = 0; i < localStorage.length; i++) {
        let monobjet_json = localStorage.getItem(localStorage.key(i));
        let monobjet = JSON.parse(monobjet_json)
        const prodList = document.getElementById('added__products')
        productChosen = document.createElement("div")
        totalPrice += parseInt(monobjet.price)
        prodList.appendChild(productChosen)    
        productChosen.textContent = monobjet.name + " -- " + " PRIX: " + monobjet.price + " €"
    }
    const prodList = document.getElementById('added__products')
    totalDisplay = document.createElement("div")
    prodList.appendChild(totalDisplay)
    totalDisplay.textContent = "MONTANT TOTAL: " + totalPrice + " €"
}

function emptyCart() {
    const emptyButton = document.getElementById('empty__cart');
    emptyButton.onclick = function(){
        localStorage.clear();
        location.reload();   
    }
}

main()



