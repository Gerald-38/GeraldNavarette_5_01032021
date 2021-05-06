const URL_ENDPOINT = 'http://localhost:3000/api/cameras/'

function getProducts(url) {
    return fetch(url)
     .then(function(httpBodyResponse){
         return httpBodyResponse.json()
     })     
     .catch(function(error) {
         alert(error)
         //afficher l'erreur en haut avec un getelement byid ou créer un page 404 et rediriger l'utilisateur
     })
 }

 