//on seléctionne le container qui va recevoir les données pour créer le panier en le stockant dans une variable
const cartItems = document.getElementById('cart__items');

//On déclare des variables de tableaux vides afin de récupérer le prix total et le nombre total des produits du panier
let arrayPrice = [];
let arrayTotalProduct = [];

//On sélectionne les containers qui affichent le prix total et le nombre total d'articles
let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');

//O récupère les données du panier
let basketProducts = JSON.parse(localStorage.getItem('panier'));
console.log(basketProducts);

//On boucle sur le tableau du panier et on ne récupère dans le fetch que les données de l'api en fonction des id des produits présents dans le panier
if (basketProducts == null) {
  let h2 = document.createElement('h2');
  cartItems.appendChild(h2);
  h2.textContent = 'Aucun produit dans votre panier';
  h2.style.textAlign = 'center';
} else {
  for (let product of basketProducts) {
    let apiProduct = `http://localhost:3000/api/products/${product.id}`;
    fetch(apiProduct)
      .then((response) => response.json())
      .then((data) => {
        displayBasket(data, product);
      })
      .catch((err) => {
        console.log('Erreur' + err);
      });
  }
}
const displayBasket = (product, basketProduct) => {
  //structrure injection code dynamiquement

  //Création de la balise article et sesattributs
  const article = document.createElement('article');
  cartItems.appendChild(article);
  article.className = 'cart__item';
  article.dataset.id = product._id;
  article.dataset.color = basketProduct.color;

  //création div contenant l'image
  const containerItemImage = document.createElement('div');
  article.appendChild(containerItemImage);
  containerItemImage.className = 'cart__item__img';

  //création balise image
  const photo = document.createElement('img');
  containerItemImage.appendChild(photo);
  photo.src = product.imageUrl;
  photo.alt = product.altTxt;

  //création div contenant contenu produit
  const containerItemContent = document.createElement('div');
  article.appendChild(containerItemContent);
  containerItemContent.className = 'cart__item__content';

  //création div contenant contenu description du produit
  const containerItemDescription = document.createElement('div');
  containerItemContent.appendChild(containerItemDescription);
  containerItemDescription.className = 'cart__item__content__description';

  //Création h2 pour nom du produit
  const name = document.createElement('h2');
  name.textContent = `${product.name}`;
  containerItemDescription.appendChild(name);

  //Création p pour couleur du produit
  const colorProduct = document.createElement('p');
  colorProduct.textContent = basketProduct.color;
  containerItemDescription.appendChild(colorProduct);

  //Création p pour prix du produit
  const priceProduct = document.createElement('p');
  priceProduct.textContent = `${product.price}€`;
  containerItemDescription.appendChild(priceProduct);

  //création div contenant contenu données du produit
  const containerItemSettings = document.createElement('div');
  containerItemContent.appendChild(containerItemSettings);
  containerItemSettings.className = 'cart__item__content__settings';

  //création balises contenant quantité du produit
  const quantityProductContainer = document.createElement('div');
  containerItemSettings.appendChild(quantityProductContainer);
  quantityProductContainer.className =
    'cart__item__content__settings__quantity';

  const quantityProduct = document.createElement('p');
  quantityProductContainer.appendChild(quantityProduct);
  quantityProduct.textContent = 'Qté : ';

  const input = document.createElement('input');
  quantityProductContainer.appendChild(input);
  input.type = 'number';
  input.className = 'itemQuantity';
  input.name = 'itemQuantity';
  input.min = '1';
  input.max = '100';
  input.value = basketProduct.quantity;

  //On récupère le nombre d'articles et le prix total des articles(nb * prix)
  arrayPrice.push(basketProduct.quantity * product.price);
  arrayTotalProduct.push(parseInt(basketProduct.quantity));
 
//Sortir le calcul de la fonction ?
console.log(arrayTotalProduct);

totalQuantity.textContent = arrayTotalProduct.reduce(
  (prev, curr) => prev + curr
);
totalPrice.textContent = arrayPrice.reduce(
  (prev, curr) => prev + curr
);
 console.log(arrayPrice);
 

  //Création balises pour supprimer produit
  const deleteItemContainer = document.createElement('div');
  deleteItemContainer.className = 'cart__item__content__settings__delete';
  containerItemSettings.appendChild(deleteItemContainer);

  const deleteItem = document.createElement('p');
  deleteItemContainer.appendChild(deleteItem);
  deleteItem.className = 'deleteItem';
  deleteItem.textContent = 'Supprimer';
};
 console.log(arrayPrice);
 





