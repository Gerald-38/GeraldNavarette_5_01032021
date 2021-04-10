
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
    document.getElementById("product__price").textContent = (product.price/1000).toFixed(2) + " €"
    document.getElementById("product__description").textContent = product.description
    document.getElementById("product__image").innerHTML = "<img src= " + product.imageUrl + ">" 

    let productObject = {
         id: product._id,
         name: product.name,
         price: product.price,
         quantity: 1
    }

    let productArray=JSON.parse(localStorage.getItem('productCart'))
    

    let idArray=[]


    if (productArray !== null )  {
        productArray.forEach(product => {
            idArray.push(product.id)            
        });
        }


    const addToCart = () => {
        productArray.push(productObject)
        localStorage.setItem('productCart', JSON.stringify(productArray))
        window.location='cart.html'
    }

    const addButton = document.getElementById('basket__add__btn')    
    addButton.onclick = function(e){    
        e.preventDefault()    
        if (productArray !== null) {
            if (idArray.some(x => x === productObject.id)) {
               // alert('Vous avez déjà sélectionné le modèle ' + productObject.name + ' , rendez vous sur votre panier pour en augmenter le nombre à commander')
                productObject.quantity+=1
                let indexOfProduct = productArray.findIndex(i => i.id === productObject.id);
                productArray.splice(indexOfProduct, 1, productObject)
                console.log(productArray)
                localStorage.setItem('productCart', JSON.stringify(productArray))
                //location.reload()
                //window.location='cart.html'                
            }
            else {
                addToCart()
            } 
        }
        else {
            productArray = []
            addToCart()
        }        
    }
}

function displayLenses(product) {
    const lensesList = (product.lenses)
    let lensesElt = document.getElementById('product__lenses')       
    for (lens of lensesList) {    
        let option = document.createElement("option")
        option.innerText = lens
        option.value = lens
        lensesElt.appendChild(option)  
    }    
}






