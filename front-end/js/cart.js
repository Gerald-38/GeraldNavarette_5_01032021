function main () {
    displayCart()
    increaseProduct()
    removeProduct()
    decreaseProduct()
    emptyCart()
    goBack()
}

let productArray=JSON.parse(localStorage.getItem('productCart'))
console.log(localStorage)
//console.log(productArray)

function displayCart() {
    let subTotalPrice = 0
    let shippingPrice = 6.9
    //let totalPrice = subTotalPrice + shippingPrice
    
    if((productArray) && productArray.length > 0) {
        productArray.forEach(addedProduct => {
            console.log(addedProduct.name)
            const prodList = document.getElementById('added__products')
            subTotalPrice += parseInt(addedProduct.price*addedProduct.quantity)
            productChosen = document.createElement("tr")
            productChosen.innerHTML = "<td>"+ addedProduct.name +"</td><td>En stock</td><td><p class='text-center' id='product__qty'>" + addedProduct.quantity + "</p></td><td><button class='btn btn-lg btn-block btn-success text-uppercase' id='inc_" + addedProduct.id + "'>+</button></td><td><button class='btn btn-lg btn-block btn-danger text-uppercase' id='dec_" + addedProduct.id + "'>-</button></td><td class='text-right'>" + (addedProduct.price/1000*addedProduct.quantity).toFixed(2) + " €</td><td class='text-right'><button class='btn btn-sm btn-danger' id=" + addedProduct.id + "><i class='fa fa-trash' id='trash__product'></i> </button> </td>"
            prodList.appendChild(productChosen)              
        });
        let subTotalDisplay = document.getElementById('sub__total')
        subTotalDisplay.textContent = (subTotalPrice/1000).toFixed(2) + " €"
        let totalDisplay = document.getElementById('total__price')
        totalDisplay.textContent = (subTotalPrice/1000 + shippingPrice).toFixed(2) +  " €"
        let totalPrice = (subTotalPrice/1000 + shippingPrice).toFixed(2)       
        localStorage.setItem('totalprice', JSON.stringify(totalPrice))
        console.log('prix total ' + totalPrice)
    }
    else {
        const prodList = document.getElementById('product__cart')
        prodList.innerHTML = "<p>LE PANIER EST VIDE</p>"
    } 
}

const updateCart = () => {
    localStorage.setItem('productCart', JSON.stringify(productArray))    
    location.reload() 
}

function removeProduct() {
    if(productArray) {
        productArray.forEach (addedProduct => {
            const productTrash=document.getElementById(addedProduct.id)
                productTrash.onclick = function() {
                    let indexOfProduct = productArray.findIndex(i => i.id === addedProduct.id);
                    productArray.splice(indexOfProduct, 1)
                    console.log(productArray)
                    updateCart()                              
                }
        })
    }
}

function increaseProduct() {
    if(productArray) {
        productArray.forEach (addedProduct => {
            const productInc=document.getElementById('inc_'+addedProduct.id)
                productInc.onclick = function() {
                    addedProduct.quantity +=1
                    updateCart()          
                }
        })
    }
}

function decreaseProduct() { 
    if(productArray) {   
        productArray.forEach (addedProduct => {
            if (addedProduct.quantity > 0) {
                const productDec=document.getElementById('dec_'+addedProduct.id)        
                productDec.onclick = function() {
                    addedProduct.quantity -=1
                    updateCart()          
                }
            }
            else {
                let indexOfProduct = productArray.findIndex(i => i.id === addedProduct.id);
                    productArray.splice(indexOfProduct, 1)
                    console.log(productArray)
                    updateCart()       
            }
        })
    }
}

function emptyCart() {
    const emptyButton = document.getElementById('empty__cart');
    emptyButton.onclick = function(){
        productArray.splice(0, productArray.length);
        totalPrice = 0
        localStorage.setItem('totalprice', JSON.stringify(totalPrice))
        updateCart()
        console.log(productArray)         
    }
}

function goBack() {
    const backButton = document.getElementById('back__button');
    backButton.onclick = function() {
        window.location='index.html'
    }
}

main()



