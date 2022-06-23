//On déclare une variable contenant un tableau vide afin de récupérer les données de l'api de façon globale
let productsArray = [];
//Récuperation de l'url de l'api
const apiProducts = 'http://localhost:3000/api/products';
//fetch va faire une requête à l'api si ok la réponse est traitée en json alors .then et on récupère les données dans notre variable, sinon erreur .catch
const fetchApi = async () => {
  await fetch(apiProducts)
    .then((response) => response.json())
    .then((data) => {
      productsArray = data;
    })
    .catch((err) => {
      console.log('Erreur' + err);
    });
};

const displayProducts = async () => {
  await fetchApi();
  for (let product of productsArray) {
    //on seléctionne le container qui va recevoir les données pour créer les produits en le stockant dans une variable
    let items = document.getElementById('items');

    // On crée une balise a que l'on stocke dans une variable pour réutilisation
    let a = document.createElement('a');

    //On lui ajoute un attribut href qui va récupérer l'id du produit dans les données de l'api
    a.href = `./product.html?id=${product._id}`;

    //On ajoute cette balise a au container
    items.appendChild(a);

    // On crée une balise article que l'on ajoute à la balise a
    let article = document.createElement('article');
    a.appendChild(article);

    //On crée la balise image avec ses attributs(récupérés via l'api) que l'on ajoute à la balise article
    let image = document.createElement('img');
    image.src = `${product.imageUrl}`;
    image.alt = `${product.altTxt}`;

    article.appendChild(image);

    //On crée un titre h3 avec une classe et un contenu, on l'ajoute à la balise article
    let h3 = document.createElement('h3');
    h3.className = 'productName';
    h3.textContent = `${product.name}`;
    article.appendChild(h3);

    //On crée un paragraphe p avec une classe et un contenu, on l'ajoute à la balise article
    let p = document.createElement('p');
    p.className = 'productDescription';
    p.textContent = `${product.description}`;
    ('Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.');
    article.appendChild(p);
  }
};

displayProducts();

