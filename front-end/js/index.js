(async function() {
    const products = await getProducts()
    for (product of products) {
        displayProduct(product)
    }
})()

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

function displayProduct(product) {
    const templateElt = document.getElementById("templateProduct")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("product__name").textContent = product.name
    cloneElt.getElementById("product__price").textContent = (product.price/1000).toFixed(2) + " €"
    cloneElt.getElementById("product__description").textContent = product.description
    cloneElt.getElementById("product__link").innerHTML = "<a href=" + 'product.html' + '?' + 'id=' + product._id + ">" + 'Produit' + "</a>"  
    document.getElementById('main').appendChild(cloneElt)       
}


