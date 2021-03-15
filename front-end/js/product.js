
(async function() {
    const product = await getProduct()
    displayProduct(product) 
    displayLenses(product)   
})()

function getProduct() {
    const urlPart = location.search;
    const urlPartArray = urlPart.split('=');
    const productParam = urlPartArray[1];
    return fetch("http://localhost:3000/api/cameras/" + productParam)
     .then(function(httpBodyResponse){
         return httpBodyResponse.json()
     })
     .then(function(product) {
        return product        
     })
     .catch(function(error) {
         alert(error)
     })
 }

 function displayProduct(product) {
    document.getElementById("product__name").textContent = product.name
    document.getElementById("product__price").textContent = product.price + " €"
    document.getElementById("product__description").textContent = product.description
    document.getElementById("product__image").innerHTML = "<img src= " + product.imageUrl + ">" 

    let productObject = {
         id: product._id,
         name: product.name,
         price: product.price
    }

    const addButton = document.getElementById('basket__add__btn')
    addButton.onclick = function(){
        window.location='cart.html'
        let productObject_json = JSON.stringify(productObject)
        localStorage.setItem(product._id, productObject_json)     
    }
}


function displayLenses(product) {
    const lensesList = (product.lenses)
    let lensesElt = document.getElementById('product__lenses')       
    for (lens of lensesList) {        
        let lenseElt = document.getElementById('lense__value')
        let option = document.createElement("option")
        option.innerText = lens
        option.value = lens
        lensesElt.appendChild(option)  
    }    
}






