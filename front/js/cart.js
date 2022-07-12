//on seléctionne le container qui va recevoir les données pour créer le panier en le stockant dans une variable
const cartItems = document.getElementById('cart__items');

//On déclare des variables de tableaux vides afin de récupérer le prix total et le nombre total des produits du panier
let arrayPrice = [];
let arrayTotalProduct = [];
let totalProducts = 0;
//On déclare des variables de chaines de caractères vides afin de récupérer les data attributs des produits
let ciblingProductColor = '';
let ciblingProductId = '';

let productsData = [];
//On sélectionne les containers qui affichent le prix total et le nombre total d'articles
let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');

//Regex
const regexLettersWithAccents = /[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
const regexAdress = /^\s*\S+(?:\s+\S+){2}/;
const regexEmail = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;
//sélection des balises du formulaire
const containerForm = document.querySelector('.cart__order__form');
const firstName = document.getElementById('firstName');
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastName = document.getElementById('lastName');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const address = document.getElementById('address');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const city = document.getElementById('city');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const email = document.getElementById('email');
const emailErrorMsg = document.getElementById('emailErrorMsg');
const order = document.getElementById('order');

//On récupère les données du panier
let basketProducts = JSON.parse(localStorage.getItem('panier'));

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

       
        
        productsData.push({
          id: data._id,
          price: data.price,
          quantity: product.quantity,
        });
console.log(productsData)
        calculTotal();
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
  deleteProduct();
};

//Fonction qui va calculer le nombre total des produits du panier
/*const sumOfProducts = (basketProduct) => {
  totalProducts = totalProducts + parseInt(basketProduct.quantity);
  console.log(totalProducts);
 
  /*arrayTotalProduct.push(parseInt(basketProduct.quantity));
  totalQuantity.textContent = arrayTotalProduct.reduce(
    (prev, curr) => prev + curr
  );
};

//Fonction qui va calculer le prix total des produits du panier
const totalPriceOfProducts = (product, basketProduct) => {
  arrayPrice.push(basketProduct.quantity * product.price);
  totalPrice.textContent = arrayPrice.reduce((prev, curr) => prev + curr);
};
*/

//Fonction calculant le nombre de produits et le prix dans le panier
const calculTotal = () => {
  let quantity = 0;
  let sum = 0;
  for (let product of productsData) {
    quantity = quantity + parseInt(product.quantity);
    sum = sum + product.quantity * product.price;
  }
  
  totalPrice.textContent = sum;
  totalQuantity.textContent = quantity;
};

//Fonction gérant modification quantité produit
const modifiedQuantity = () => {
  //On sélectionne tous les inputs des quantités des produits
  let itemQuantities = document.querySelectorAll('.itemQuantity');

  //On écoute les changements faits sur chacun au niveau quantité
  for (let itemQuantity of itemQuantities) {
    itemQuantity.addEventListener('change', (e) => {
      //on récupère la valeur de l'input modifié
      let inputValue = e.target.value;

      //On récupère les data attributs des produits pour action sur quantité de produits
      recupDataAttribut(itemQuantity);

      //Si l'id ou la couleur du produit est la même que les données récupérées alors on remplace la quantité qui était stockée par la nouvelle

      for (let thisProduct of productsData) {
        if (
          thisProduct.id == ciblingProductId
          // thisProduct.color == ciblingProductColor
        ) {
          thisProduct.quantity = inputValue;
        }
      }
      // Mise à jour clé panier
      updateBasket(ciblingProductId, ciblingProductColor, inputValue);
      
      //Mise à jour du total des produits et du prix global
      calculTotal();

      //Si la valeur dans l'input est inférieure à 1 ou supérieure à 100 alors on affiche un message "d'erreur" et on recharge la page
      /*if (inputValue >= 100 || inputValue < 1) {
        alert('Veuilez choisir une quantité comprise entre 1 et 100');
        location.reload();
      }*/
    });
  }
};

//Fonction gérant suppression produit
const deleteProduct = () => {
  //On sélectionne tous les boutons supprimer
  let deleteItems = document.querySelectorAll('.deleteItem');

  for (let deleteItem of deleteItems) {
    //on met un écouteur au clic sur chaque bouton
    deleteItem.addEventListener('click', () => {
      //On récupère les data attributs des produits pour supprimer un produit
      recupDataAttribut(deleteItem);

     

      // Mise à jour clé panier
      updateBasket(ciblingProductId, ciblingProductColor, 0);
    });
  }
};

//Fonction générique pour récuperer les data attributs des produits
const recupDataAttribut = (attribut) => {
  //récupération du data-attribut couleur du produit
  ciblingProductColor = attribut.closest('article').dataset.color;

  //récupération du data-attribut couleur du produit
  ciblingProductId = attribut.closest('article').dataset.id;
};

// Les données récupérées sont sous la forme d'un tableau, on les transforme en chaine de caractère et on met à jour les données stockées dans le localStorage, puis on recharge la page
const updateBasket = (ciblingProductId, ciblingProductColor, inputValue) => {
  let basketProducts = JSON.parse(localStorage.getItem('panier'));
  // S'il y a un nombre supérieur à 0 de produits et que l'id et la couleur  sont  ceux sur lesquels il y a eu une modification
  if (inputValue > 0) {
    for (let thisProduct of basketProducts) {
      if (
        thisProduct.id == ciblingProductId &&
        thisProduct.color == ciblingProductColor
      ) {
        thisProduct.quantity = inputValue;
      }
    }
  } else {
    //Sinon on filtre le tableau des produits en n'affichant que les produits ayant une quantité
    basketProducts = basketProducts.filter(
      (p) => !(p.id == ciblingProductId && p.color == ciblingProductColor)
    );
  }

  localStorage.setItem('panier', JSON.stringify(basketProducts));
};

//Vérification des champs du formulaire
containerForm.addEventListener('input', () => {
  /*verification le prénom est vide ou à moins de 2 charactères ou contient des chiffres avec la regex*/
  if (regexLettersWithAccents.test(firstName.value) == false) {
    firstNameErrorMsg.textContent = 'Veuillez entrer un prénom valide';
  } else {
    firstNameErrorMsg.textContent = ''; //pas d'erreur donc pas de message
  }
  /*verification le prénom est vide ou à moins de 2 charactères ou contient des chiffres avec la regex*/
  if (regexLettersWithAccents.test(lastName.value) == false) {
    lastNameErrorMsg.textContent = 'Veuillez entrer un nom valide';
  } else {
    lastNameErrorMsg.textContent = ''; //pas d'erreur donc pas de message
  }

  //verification adresse valide
  if (regexAdress.test(address.value) == false) {
    addressErrorMsg.textContent = 'Veuillez entrer une adresse valide';
  } else {
    addressErrorMsg.textContent = ''; //pas d'erreur donc pas de message
  }

  //verification ville valide
  if (regexLettersWithAccents.test(city.value) == false) {
    cityErrorMsg.textContent = 'Veuillez entrer une ville valide';
  } else {
    cityErrorMsg.textContent = ''; //pas d'erreur donc pas de message
  }
  //verification email valide
  if (regexEmail.test(email.value) == false) {
    // Caractère absent ou ne répondant pas aux conditions du regex
    emailErrorMsg.textContent =
      'Veuillez entrer une adresse de messagerie valide';
  } else {
    // test regex mail ok
    emailErrorMsg.textContent = '';
    // Pas d'erreur
  }
});

order.addEventListener('click', (e) => {
  //bloque l'envoi automatique du formulaire s'il n'est pas correctement rempli
  e.preventDefault();
  if (
    //Si tous les champs du formulaire sont remplis
    firstName.value &&
    lastName.value &&
    address.value &&
    city.value &&
    email.value
  ) {
    console.log('formulaire ok');

    //Objet contact à envoyer au serveur
    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };
    console.log(contact);

    //tableau produits à envoyer au serveur en ne gardant que les id
    let products = basketProducts.map((product) => product.id);

    // variable order regroupant les objets contact et products à envoyer au back-end pour valider la commande
    let order = { contact: contact, products: products };
    console.log(order);

    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = `./confirmation.html?orderId=${data.orderId}`;
        console.log('confirmation.html?orderId=' + data.orderId);
      })
      .catch((err) => {
        console.log('Erreur' + err);
      });
  } else {
    alert('Veuillez complèter tous les champs du formulaire');
  }
});

//localStorage.setItem("clé", "valeur")
//localStorage.getItem("clé")
//localStorage.clear();

// Appel à l'api order pour envoyer les tableaux
