function main () {
    displayCart()
    increaseProduct()
    removeProduct()
    emptyCart()
    goBack()
}

function displayCart() {
    let subTotalPrice = 0
    let shippingPrice = 6.9
    let totalPrice = subTotalPrice + shippingPrice
    let cartContent = localStorage.length
    console.log(localStorage)

    if (cartContent != '0') {
        for (let i = 0; i < localStorage.length; i++) {
            let addedProduct_json = localStorage.getItem(localStorage.key(i));
            let addedProduct = JSON.parse(addedProduct_json)
            const prodList = document.getElementById('added__products')
            subTotalPrice += parseInt(addedProduct.price)
            productChosen = document.createElement("tr")
            productChosen.innerHTML = "<td>" + addedProduct.name + "</td><td>En stock</td><td><p class='text-center' id='product__qty'>" + addedProduct.quantity + "</p></td><td><button class='btn btn-lg btn-block btn-success text-uppercase' id='add__product'>+</button></td><td><button class='btn btn-lg btn-block btn-danger text-uppercase' id='remove__product'>-</button></td><td class='text-right'>" + (addedProduct.price/1000*addedProduct.quantity).toFixed(2) + " €</td><td class='text-right'><button class='btn btn-sm btn-danger'><i class='fa fa-trash' id='trash__product'></i> </button> </td>"
            prodList.appendChild(productChosen)     
        }
        let subTotalDisplay = document.getElementById('sub__total')
        subTotalDisplay.textContent = (subTotalPrice/1000).toFixed(2) + " €"
        let totalDisplay = document.getElementById('total__price')
        totalDisplay.textContent = (subTotalPrice/1000 + shippingPrice).toFixed(2) +  " €"
        
    } else {
        const prodList = document.getElementById('product__cart')
        prodList.innerHTML = "<p>LE PANIER EST VIDE</p>"
    }   

}

function removeProduct() {
    // const productTrash=document.getElementsByTagName(i)
    // productTrash.onclick = function() {
    //     console.log('produit supprimé')
    //}
}

function increaseProduct() {
    if (localStorage.length != 0) {
        let quantity = 1
        const productInc = document.getElementById('add__product')
        const productDec = document.getElementById('remove__product')  
        const productQty = document.getElementById('product__qty')   
        productInc.addEventListener('click', function() {  
            quantity+=1
            productQty.innerHTML = quantity        
            });
        productDec.addEventListener('click', function() {  
            quantity-=1
            productQty.innerHTML = quantity        
            });
    }
}

function emptyCart() {
    const emptyButton = document.getElementById('empty__cart');
    emptyButton.onclick = function(){
        localStorage.clear();
        location.reload();   
    }
}

function goBack() {
    const backButton = document.getElementById('back__button');
    backButton.onclick = function() {
        window.location='index.html'
    }
}

main()



