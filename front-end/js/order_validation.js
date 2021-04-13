
    
const orderId = new URL(location.href).searchParams.get('orderId') || 'ERREUR'
let totalPrice=JSON.parse(localStorage.getItem('totalprice'))
console.log(orderId)
document.getElementById('orderId').textContent = orderId
document.getElementById('totalPrice').textContent += ' ' + totalPrice + ' Euros'


console.log(totalPrice)

localStorage.removeItem('productCart')
localStorage.removeItem('totalprice')