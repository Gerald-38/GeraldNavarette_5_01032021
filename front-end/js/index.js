(async function() {
    const products = await getProducts()
    for (product of products) {
        displayProducts(product)
    }
})()

//********* RECUPERATION DE LA LISTE DES PRODUITS **********

function getProducts() {
   return fetch("http://localhost:3000/api/cameras")
    .then(function(httpBodyResponse){
        return httpBodyResponse.json()
    })
    .then(function(products) {
       return products
    })
    .catch(function(error) {
        alert(error)
    })
}

//********* AFFICHAGE DE LA LISTE DES PRODUITS **********

function displayProducts(product) {
    const templateElt = document.getElementById("templateProduct")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("product__image").innerHTML = "<img src= " + product.imageUrl + ">" 
    cloneElt.getElementById("product__name").textContent = product.name
    cloneElt.getElementById("product__price").textContent = (product.price/1000).toFixed(2) + " €"
    cloneElt.getElementById("product__description").textContent = product.description
    cloneElt.getElementById('product__card').onclick = function() {
        window.location='product.html' + '?' + 'id=' + product._id
    }  
    document.getElementById('main').appendChild(cloneElt)       
}


