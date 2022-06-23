//On récupère l'id contenue dans l'url de la page web du produit sélectionné
let idUrlProduct = new URL(document.location).searchParams.get('id');
console.log(idUrlProduct);

//On déclare une variable contenant un tableau vide afin de récupérer les données de l'api de façon globale
let productSelected = [];

//Récuperation de l'url de l'api avec l'id du produit de la page affichée
const apiProductWithId = `http://localhost:3000/api/products/${idUrlProduct}`;
/*fetch va faire une requête à l'api si ok alors .then et exécution de la fonction qui va traiter la data pour créer la page web, sinon erreur .catch*/

const fetchProductSelected = async () => {
  await fetch(apiProductWithId)
    .then((response) => response.json())
    .then((data) => {
      productSelected = data;
    })
    .catch((err) => {
      console.log('Erreur' + err);
    });
};

const displaySelected = async () => {
    await fetchProductSelected();
  //on sélectionne le container où sera injecté le code via js dans l'html
  let itemImg = document.querySelector('.item__img');
  //On crée la balise image avec ses attributs
  let imgProduct = document.createElement('img');
  imgProduct.src = `${productSelected.imageUrl}`;
  imgProduct.alt = `${productSelected.altTxt}`;
  //On ajoute la balise image à son container
  itemImg.appendChild(imgProduct);

  //On ajoute le nom du produit
  let chairName = document.querySelector('#title');
  chairName.textContent = `${productSelected.name}`;

  //on ajoute le prix du produit
  let chairPrice = document.querySelector('#price');
  chairPrice.textContent = `${productSelected.price}`;

  //on ajoute la description du produit
  let chairDescription = document.querySelector('#description');
  chairDescription.textContent = `${productSelected.description}`;

  let chairColors = productSelected.colors;

  for (let color of chairColors) {
    console.log(color);
    let colorSelection = document.querySelector('#colors');
    console.log(colorSelection);
    let dropdown = document.createElement('option');
    dropdown.value = `${color}`;
    dropdown.textContent = `${color}`;
    colorSelection.appendChild(dropdown);
  }
};

displaySelected()
