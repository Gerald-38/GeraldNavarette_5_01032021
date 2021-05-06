const URL_ENDPOINT = 'http://localhost:3000/api/cameras/';

function getProducts(url) {
    return fetch(url)
     .then(function(httpBodyResponse){
         return httpBodyResponse.json()
     })    
     .catch(function(error) {
         window.location='error.html'
     });
 }

 