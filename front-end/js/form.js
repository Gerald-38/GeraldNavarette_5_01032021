

//**********VALIDATION DU FORMULAIRE**********

let formValid = document.getElementById('order__submit__btn')

// Regex de validation pour les nom, prénom, et Ville
let nameFnameTownValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/

// Regex de validation pour le code postal
let postalCodeValid = /\d{5}/

//Regex de validation du numéro de téléphone
let phoneNumberValid = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/

//Regex de validation pour l'adresse mail
let emailValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

//Récupération du nom
let userName = document.getElementById('inputName')
let missName = document.getElementById('missName')

//Récupération du prénom
let userFirstName = document.getElementById('inputFirstName')
let missFirstName = document.getElementById('missFirstName')

//Récupération de l'adresse 
let userAdress = document.getElementById('inputAdress')
let missAdress = document.getElementById('missAdress')

//Récupération du code postal
let userPostalCode = document.getElementById('inputPostalCode')
let missPostalCode = document.getElementById('missPostalCode')

//Récupération de la ville
let userTown = document.getElementById('inputTown')
let missTown = document.getElementById('missTown')

//Récupération du numéro de téléphone
let userPhoneNumber = document.getElementById('inputPhoneNumber')
let missPhoneNumber = document.getElementById('missPhoneNumber')

//Récupération de l'adresse email
let userEmail = document.getElementById('inputEmail')
let missEmail = document.getElementById('missEmail')


function validateFields(event) {
    event.preventDefault()
//Validation du nom
    //Si le champ Nom est vide
    if (userName.validity.valueMissing){
        event.preventDefault()
        missName.textContent = 'Nom manquant'
        missName.style.color = 'red'   
    //Si le format de données est incorrect
    }else if (nameFnameTownValid.test(userName.value) == false){
        event.preventDefault()
        missName.textContent = 'Format incorrect'
        missName.style.color = 'orange'
    }else{ 
        missName.textContent = " "
    }
//Validation du Prénom
    //Si le champ Prénom est vide
    if (userFirstName.validity.valueMissing){
        event.preventDefault()
        missFirstName.textContent = 'Prénom manquant'
        missFirstName.style.color = 'red'    
    //Si le format de données est incorrect
    }else if (nameFnameTownValid.test(userFirstName.value) == false){
        event.preventDefault()
        missFirstName.textContent = 'Format incorrect'
        missFirstName.style.color = 'orange'
    }else{ 
        missFirstName.textContent = " "
    }
//Validation de l'adresse
    //Si le champ Adresse est vide
    if (userAdress.validity.valueMissing){
        event.preventDefault()
        missAdress.textContent = 'Adresse manquante'
        missAdress.style.color = 'red' 
    }else{ 
        missAdress.textContent = " "
    }
    
//Validation du code postal
    //Si le champ Code Postal est vide
    if (userPostalCode.validity.valueMissing){
        event.preventDefault()
        missPostalCode.textContent = 'Code Postal manquant';
        missPostalCode.style.color = 'red'       
    //Si le format de données est incorrect
    }else if (postalCodeValid.test(userPostalCode.value) == false){
        event.preventDefault()
        missPostalCode.textContent = 'Format incorrect'
        missPostalCode.style.color = 'orange'
    }else{ 
        missPostalCode.textContent = " "
    } 

//Validation de la ville
    //Si le champ Ville est vide
    if (userTown.validity.valueMissing){
        event.preventDefault()
        missTown.textContent = 'Ville manquante'
        missTown.style.color = 'red'   
    //Si le format de données est incorrect 
    }else if (nameFnameTownValid.test(userTown.value) == false){
        event.preventDefault()
        missTown.textContent = 'Format incorrect'
        missTown.style.color = 'orange'
    }else{ 
        missTown.textContent = " "
    } 

//Validation du numéro de téléphone
    //Si le champ Tel est vide
    if (userPhoneNumber.validity.valueMissing){
        event.preventDefault()
        missPhoneNumber.textContent = 'Numéro de téléphone manquant'
        missPhoneNumber.style.color = 'red'   
    //Si le format de données est incorrect
    }else if (phoneNumberValid.test(userPhoneNumber.value) == false){
        event.preventDefault()
        missPhoneNumber.textContent = 'Format incorrect'
        missPhoneNumber.style.color = 'orange'
    }else{ 
        missPhoneNumber.textContent = " "
    }

//Validation de l'adresse mail
    //Si le champ Email est vide
    if (userEmail.validity.valueMissing){
        event.preventDefault()
        missEmail.textContent = 'Adresse mail manquante'
        missEmail.style.color = 'red'   

    //Si le format de données est incorrect 
    }else if (emailValid.test(userEmail.value) == false){
        event.preventDefault()
        missEmail.textContent = 'Format incorrect'
        missEmail.style.color = 'orange'
    }else{         
        missEmail.textContent = " "               
    }
}


//**********VALIDATION ET ENVOI DE LA COMMANDE**********

function postOrder() {
    if ( userName.checkValidity() && userFirstName.checkValidity() &&  userAdress.checkValidity() && userPostalCode.checkValidity() && userTown.checkValidity() && userPhoneNumber.checkValidity() && userEmail.checkValidity() ) {
        
        let productArray=JSON.parse(localStorage.getItem('productCart'))

        const products =[]

        if (productArray !== null )  {
            productArray.forEach(product => {
                products.push(product.id)            
            });
        }  

        const order = {     
            contact: {
            firstName: userFirstName.value,
            lastName: userName.value,
            address: userAdress.value + ' ' + userPostalCode.value,
            city: userTown.value,
            email: userEmail.value,
            },
            products: products,
        }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
          }
        
          fetch(`http://localhost:3000/api/cameras/order`, requestOptions)
            .then((response) => response.json())
            .then((json) => {
              window.location.href = `orderconf.html?orderId=${json.orderId}`
            })
            .catch((error) => {
              alert(error)
            })      
    } 
    else {
        alert('La commande n\'a pu être validée, vérifiez votre saisie')
    }
}

function sendOrder() {
    validateFields(event)
    postOrder()
}

formValid.addEventListener('click', sendOrder)








