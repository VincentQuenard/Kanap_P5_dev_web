//On récupère l'id contenue dans l'url de la page web du produit sélectionné
const idProduct = new URL(document.location).searchParams.get('id');
console.log(idProduct);

//On déclare une variable contenant un tableau vide afin de récupérer les données de l'api de façon globale
let productSelected = [];

//VARIABLES GLOBALES
const quantitySelection = document.querySelector('#quantity');
 
//on sélectionne la balise où sera injecté le code via js dans l'html pour afficher l'image du produit
const itemImg = document.querySelector('.item__img');

//on sélectionne la balise où sera injecté le code via js dans l'html pour afficher le nom du produit
const chairName = document.querySelector('#title');

//on sélectionne la balise où sera injecté le code via js dans l'html pour afficher le prix du produit
const chairPrice = document.querySelector('#price');

//on sélectionne la balise où sera injecté le code via js dans l'html pour afficher la description du produit
const chairDescription = document.querySelector('#description');

//on sélectionne la balise où sera injecté le code via js dans l'html pour afficher la couleur du produit
const colorSelection = document.querySelector('#colors');

//on sélectionne la balise du bouton ajouter au panier pour effectuer des actions au clic
const buttonAddToCart = document.querySelector('#addToCart');

//Récuperation de l'url de l'api avec l'id du produit de la page affichée
const apiProductWithId = `http://localhost:3000/api/products/${idProduct}`;
/*fetch va faire une requête à l'api si ok alors .then et exécution de la fonction qui va traiter la data pour créer la page web, sinon erreur .catch*/
fetch(apiProductWithId)
  .then((response) => response.json())
  .then((data) => {
    displaySelected(data)
  })
  .catch((err) => {
    console.log('Erreur' + err);
  });


const displaySelected = (product) => {
  

  //On crée la balise image avec ses attributs
  const imgProduct = document.createElement('img');
  imgProduct.src = `${product.imageUrl}`;
  imgProduct.alt = `${product.altTxt}`;
  //On ajoute la balise image à son container
  itemImg.appendChild(imgProduct);

  //On ajoute le nom du produit
  chairName.textContent = `${product.name}`;

  //on ajoute le prix du produit
  chairPrice.textContent = `${product.price}`;

  //on ajoute la description du produit
  chairDescription.textContent = `${product.description}`;

  //
  const chairColors = product.colors;

  for (let color of chairColors) {
    const dropdown = document.createElement('option');
    dropdown.value = `${color}`;
    dropdown.textContent = `${color}`;
    colorSelection.appendChild(dropdown);
  }
};



// on va créer une fonction pour sauvegarder le panier dans le local storage
const saveBasket = (id, quantity, color) => {
  //on stocke dans une variable les données que l'on veut récupérer
  const arrayProduct = {
    idProduct: id,
    quantityProduct:quantity,
    ColorProduct: color,
  };
  //On stocke les données dans le local storage en transformant le tableau en une chaine de charactères
  localStorage.setItem('panier', JSON.stringify(arrayProduct));
  console.log(getBasket())
};
//On récupère le panier ??
const getBasket = () =>{
  return localStorage.getItem('panier')
}


//bouton panier listener on stocke le produit via l'api ???
 
buttonAddToCart.addEventListener('click', () => {
  //console.log(colorSelection.value);
  // console.log(quantitySelection.value);
  //console.log(idUrlProduct);
 
  
 saveBasket(idProduct, colorSelection.value, quantitySelection.value);

});

//localStorage.setItem("clé", "valeur")
//localStorage.getItem("clé")
//localStorage.clear();

