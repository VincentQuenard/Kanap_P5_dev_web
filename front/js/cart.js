//on seléctionne le container qui va recevoir les données pour créer le panier en le stockant dans une variable
const cartItems = document.getElementById('cart__items');

//On déclare des variables de tableaux vides afin de récupérer le prix total et le nombre total des produits du panier
let arrayPrice = [];
let arrayTotalProduct = [];

//On sélectionne les containers qui affichent le prix total et le nombre total d'articles
let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');

//On récupère les données du panier
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
        //On affiche la page panier
        displayBasket(data, product);

        //On affiche le nombre d'articles dans le panier
        sumOfProducts(product);

        // On affiche le prix total du panier
        totalPriceOfProducts(data, product);
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

  //Création balises pour supprimer produit
  const deleteItemContainer = document.createElement('div');
  deleteItemContainer.className = 'cart__item__content__settings__delete';
  containerItemSettings.appendChild(deleteItemContainer);

  const deleteItem = document.createElement('p');
  deleteItemContainer.appendChild(deleteItem);
  deleteItem.className = 'deleteItem';
  deleteItem.textContent = 'Supprimer';

  //On appelle la fonction gérant les quantités du panier si l'utilisateur en modifie
  modifiedQuantity();

  //On appelle la fonction qui supprime les produits au clic sur supprimer
deleteProduct()
  
};

//Fonction qui va calculer le nombre total des produits du panier
const sumOfProducts = (basketProduct) => {
  arrayTotalProduct.push(parseInt(basketProduct.quantity));
  totalQuantity.textContent = arrayTotalProduct.reduce(
    (prev, curr) => prev + curr
  );
};

//Fonction qui va calculer le prix total des produits du panier
const totalPriceOfProducts = (product, basketProduct) => {
  arrayPrice.push(basketProduct.quantity * product.price);
  totalPrice.textContent = arrayPrice.reduce((prev, curr) => prev + curr);
};

//Modification quantité produit
const modifiedQuantity = () => {
  //On sélectionne tous les inputs des quantités des produits
  let itemQuantities = document.querySelectorAll('.itemQuantity');

  //On écoute les changements faits sur chacun au niveau quantité
  for (let itemQuantity of itemQuantities) {
    itemQuantity.addEventListener('change', (e) => {
      //on récupère la valeur de l'input modifié
      let inputValue = e.target.value;

      //récupération du data-attribut couleur du produit
      let ciblingProductColor = itemQuantity.closest('article').dataset.color;

      //récupération du data-attribut couleur du produit
      let ciblingProductId = itemQuantity.closest('article').dataset.id;

      //Si l'id ou la couleur du produit est la même que les données récupérées alors on remplace la quantité qui était stockée par la nouvelle
      for (let thisProduct of basketProducts) {
        if (
          thisProduct.id == ciblingProductId &&
          thisProduct.color == ciblingProductColor
        ) {
          thisProduct.quantity = inputValue;
        }
      }

      // Les données récupérées sont sous la forme d'un tableau, on les transforme en chaine de caractère et on met à jour les données stockées dans le localStorage, puis on recharge la page

      localStorage.setItem('panier', JSON.stringify(basketProducts));
      location.reload();

      //Si la valeur dans l'input est inférieure à 1 ou supérieure à 100 alors on affiche un message "d'erreur" et on recharge la page
      if (inputValue >= 100 || inputValue < 1) {
        alert('Veuilez choisir une quantité comprise entre 1 et 100');
        location.reload();
      }
    });
  }
};


//Suppression produit
  const deleteProduct = () => {
    //On sélectionne tous les boutons supprimer
    let deleteItems = document.querySelectorAll('.deleteItem');

    for (let deleteItem of deleteItems) {
      //on met un écouteur au clic sur chaque bouton
      deleteItem.addEventListener('click', () => {
        //récupération du data-attribut couleur du produit
        let ciblingProductColor = deleteItem.closest('article').dataset.color;

        //récupération du data-attribut couleur du produit
        let ciblingProductId = deleteItem.closest('article').dataset.id;

        //on filtre le tableau des produits en ne gardant que les produits dont l'id et la couleur ne sont pas ceux sur lequel on a cliqué
        basketProducts = basketProducts.filter(
          (p) => !(p.id == ciblingProductId && p.color == ciblingProductColor)
        );
        // Les données récupérées sont sous la forme d'un tableau, on les transforme en chaine de caractère et on met à jour les données stockées dans le localStorage, puis on recharge la page
        localStorage.setItem('panier', JSON.stringify(basketProducts));
        location.reload();
      });
    }
  };