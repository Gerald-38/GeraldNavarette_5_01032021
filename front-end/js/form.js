

//**********VALIDATION DU FORMULAIRE

let formValid = document.getElementById('order__submit__btn');

// Regex de validation pour les nom, prénom, et Ville
let nameFnameTownValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

// Regex de validation pour le code postal
let postalCodeValid = /\d{5}/;

//Regex de validation du numéro de téléphone
let phoneNumberValid = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

//Regex de validation pour l'adresse mail
let emailValid = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

//Validation du nom
let userName = document.getElementById('inputName');
let missName = document.getElementById('missName');

//Validation du prénom
let userFirstName = document.getElementById('inputFirstName');
let missFirstName = document.getElementById('missFirstName');

//Validation de l'adresse 
let userAdress = document.getElementById('inputAdress');
let missAdress = document.getElementById('missAdress');

//Validation du code postal
let userPostalCode = document.getElementById('inputPostalCode');
let missPostalCode = document.getElementById('missPostalCode');

//Validation de la ville
let userTown = document.getElementById('inputTown');
let missTown = document.getElementById('missTown');

//Validation du numéro de téléphone
let userPhoneNumber = document.getElementById('inputPhoneNumber');
let missPhoneNumber = document.getElementById('missPhoneNumber');

//Validation de l'adresse email
let userEmail = document.getElementById('inputEmail');
let missEmail = document.getElementById('missEmail');


formValid.addEventListener('click', validation);

function validation(event) {
//Validation du nom
    //Si le champ Nom est vide
    if (userName.validity.valueMissing){
        event.preventDefault();
        missName.textContent = 'Nom manquant';
        missName.style.color = 'red';    
    //Si le format de données est incorrect
    }else if (nameFnameTownValid.test(userName.value) == false){
        event.preventDefault();
        missName.textContent = 'Format incorrect';
        missName.style.color = 'orange';
    }else{ 
        // let nameIsValid = true;
        missName.textContent = " ";
        // return nameIsValid;
    }
//Validation du Prénom
    //Si le champ Prénom est vide
    if (userFirstName.validity.valueMissing){
        event.preventDefault();
        missFirstName.textContent = 'Prénom manquant';
        missFirstName.style.color = 'red';    
    //Si le format de données est incorrect
    }else if (nameFnameTownValid.test(userFirstName.value) == false){
        event.preventDefault();
        missFirstName.textContent = 'Format incorrect';
        missFirstName.style.color = 'orange';
    }else{ 
        // let firstnameIsValid = true;
        missFirstName.textContent = " ";
        // return firstnameIsValid;
    }
//Validation de l'adresse
    //Si le champ Adresse est vide
    if (userAdress.validity.valueMissing){
        event.preventDefault();
        missAdress.textContent = 'Adresse manquante';
        missAdress.style.color = 'red'; 
    }else{ 
        // let adressIsValid = true;
        missAdress.textContent = " ";
        // return adressIsValid;
    }
    
//Validation du code postal
    //Si le champ Code Postal est vide
    if (userPostalCode.validity.valueMissing){
        event.preventDefault();
        missPostalCode.textContent = 'Code Postal manquant';
        missPostalCode.style.color = 'red';       
    //Si le format de données est incorrect
    }else if (postalCodeValid.test(userPostalCode.value) == false){
        event.preventDefault();
        missPostalCode.textContent = 'Format incorrect';
        missPostalCode.style.color = 'orange';
    }else{ 
        // let postalcodeIsValid = true;
        missPostalCode.textContent = " ";
        // return postalcodeIsValid;
    } 

//Validation de la ville
    //Si le champ Ville est vide
    if (userTown.validity.valueMissing){
        event.preventDefault();
        missTown.textContent = 'Ville manquante';
        missTown.style.color = 'red';   
    //Si le format de données est incorrect 
    }else if (nameFnameTownValid.test(userTown.value) == false){
        event.preventDefault();
        missTown.textContent = 'Format incorrect';
        missTown.style.color = 'orange';
    }else{ 
        // let townIsValid = true;
        missTown.textContent = " ";
        // return townIsValid;
    } 

//Validation du numéro de téléphone
    //Si le champ Tel est vide
    if (userPhoneNumber.validity.valueMissing){
        event.preventDefault();
        missPhoneNumber.textContent = 'Numéro de téléphone manquant';
        missPhoneNumber.style.color = 'red';   
    //Si le format de données est incorrect
    }else if (phoneNumberValid.test(userPhoneNumber.value) == false){
        event.preventDefault();
        missPhoneNumber.textContent = 'Format incorrect';
        missPhoneNumber.style.color = 'orange';
    }else{ 
        // let phonenumberIsValid = true;
        missPhoneNumber.textContent = " ";
        // return phonenumberIsValid
    }

//Validation de l'adresse mail
    //Si le champ Email est vide
    if (userEmail.validity.valueMissing){
        event.preventDefault();
        missEmail.textContent = 'Adresse mail manquante';
        missEmail.style.color = 'red';   

    //Si le format de données est incorrect 
    }else if (emailValid.test(userEmail.value) == false){
        event.preventDefault();
        missEmail.textContent = 'Format incorrect';
        missEmail.style.color = 'orange';
    }else{ 
        let mailIsValid = true;
        missEmail.textContent = " ";
        return mailIsValid
    }



//Validation de la commande
    if (mailIsValid ) {
        let orderIsValid = true;
        alert('commande validée');
        return orderIsValid;
    }
}



function sendOrder() {
    //Récupération de la validation de la commande

    let productArray=JSON.parse(localStorage.getItem('productCart'))
    
      const order = {
        contact: {
          firstName: userFirstName,
          lastName: userName,
          address: userAdress + ' ' + userPostalCode,
          city: userTown,
          email: userEmail,
        },
        products: productArray,
      }
    
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    
      fetch(`${apiUrl}/api/cameras/order`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          localStorage.removeItem('productCart')
          window.location.href = `${window.location.origin}/orderconf.html?orderId=${json.orderId}`
        })
        .catch(() => {
          alert(error)
        })

}


