
(async function() {
    const product = await getProduct()
    displayProduct(product) 
    displayLenses(product)   
})()

//********* RECUPERATION DU PRODUIT *****

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
 

 // ********** AFFICHAGE DU PRODUIT *****

 function displayProduct(product) {
    document.getElementById("product__name").textContent = product.name
    document.getElementById("product__price").textContent = (product.price/1000).toFixed(2) + " €"
    document.getElementById("product__description").textContent = product.description
    document.getElementById("product__image").innerHTML = "<img src= " + product.imageUrl + ">" 
  

//********** CREATION DU PANIER **********

    const productQty = document.getElementById('product__quantity')
    

    let productObject = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1 
    }

    let productArray=JSON.parse(localStorage.getItem('productCart'));
    let idArray = localStorage.getItem('idArrays') ? JSON.parse(localStorage.getItem('idArrays')) : localStorage.getItem('idArrays'); // a expliquer
    if(idArray) {
        
        if (productArray !== null )  { 
            productArray.forEach(product => {
                idArray.push(product.id)            
            });
        }
        localStorage.setItem("idArrays", JSON.stringify(idArray));
    } else {
        let idArray=[];
        if (productArray !== null )  {
            productArray.forEach(product => {
                idArray.push(product.id)            
            });
        }
        localStorage.setItem("idArrays", JSON.stringify(idArray));
    }

    const addButton = document.getElementById('basket__add__btn')  

    function addToCart() {
        const productQty = document.getElementById('product__quantity').value             
        productObject.quantity =  parseInt(productQty);
        productArray.push(productObject);
        localStorage.setItem('productCart', JSON.stringify(productArray));
        window.location='cart.html';   
    }


//********** AJOUT DU PRODUIT AU PANIER **********
    
    addButton.onclick = function(e){    
        e.preventDefault()
        let idArray = JSON.parse(localStorage.getItem('idArrays'));    

        if (productArray !== null ) {
            //********** SI LE PRODUIT A DEJA ETE SELECTIONNE AU MOINS UNE FOIS
            let productQty = document.getElementById('product__quantity').value;
            if (parseInt(productQty) > 0) {
                if (idArray.some(x => x === productObject.id)) {                  
                    let qty;
                    for (const iterator of productArray) { // ?
                        if(iterator.id === productObject.id) {
                            qty = iterator.quantity;
                        }
                    }
                    console.log(qty);
                    let productQty = document.getElementById('product__quantity').value;
                    console.log(parseInt(productQty));
                    
                    productObject.quantity =  parseInt(productQty) + parseInt(qty);                           
     
                    let indexOfProduct = productArray.findIndex(i => i.id === productObject.id);
                    productArray.splice(indexOfProduct, 1, productObject)                
                    localStorage.setItem('productCart', JSON.stringify(productArray))
                    console.log(productObject.quantity)             
                    window.location=('cart.html')                      
                 }
                 else {                
                     addToCart()             
                 } 
            }
            //********** SI LE PRODUIT N'A PAS ENCORE ETE SELECTIONNE ********** 
            else {
                console.log(productQty);
                alert('veuillez saisir une quantité au moins égale à 1')                
            }
        }
        //********** SI LE PANIER EST VIDE **********
        else {            
            productArray = []
            addToCart()
        }        
    }
}

//********** AFFICHAGE DES OPTIONS **********
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








