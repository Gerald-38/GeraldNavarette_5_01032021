//********* RECUPERATION DE L'ID DE LA COMMANDE ET DU MONTANT TOTAL **********  

const orderId = new URL(location.href).searchParams.get('orderId') || 'ERREUR';
let totalPrice=JSON.parse(localStorage.getItem('totalprice'));
document.getElementById('orderId').textContent = orderId;
document.getElementById('totalPrice').textContent += ' ' + totalPrice + ' Euros';

//********* NETTOYAGE DU LOCALSTORAGE **********

localStorage.removeItem('productCart');
localStorage.removeItem('totalprice');
localStorage.removeItem('idArrays');