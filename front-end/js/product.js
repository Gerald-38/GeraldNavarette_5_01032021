
(async function() {
    const product = await getProduct()
    displayProduct(product);
    console.log(product)
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
}


