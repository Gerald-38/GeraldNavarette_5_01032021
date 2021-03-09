(async function() {
    const products = await getProducts()
    for (product of products) {
        displayProduct(product)
    }
    console.log(products)
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
    cloneElt.getElementById("product__price").textContent = product.price + " €"
    cloneElt.getElementById("product__description").textContent = product.description
    cloneElt.getElementById("product__link").innerHTML = "<a href=" + 'product.html' + '?' + 'id=' + product._id + ">" + 'Produit' + "</a>"
    // cloneElt.getElementById("product__link").onclick = function(){window.location='product.html' + '?' + 'id' + '=' + product._id}
    
    document.getElementById('main').appendChild(cloneElt)
}

