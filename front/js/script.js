const apiProducts = 'http://localhost:3000/api/products';

fetch(apiProducts)
  .then((response) => response.json())
  .then((data) => { 
    let products = data;
     displayProducts(products);
  })
  .catch((err) => {
    console.log('Erreur' + err);
  });

const displayProducts = (products) => {
   for (let product of products) {
      console.log(product.price);
      let items = document.getElementById('items');

      let a = document.createElement('a');
      a.href = `./product.html?id=${product._id}`;
      items.appendChild(a);

      let article = document.createElement('article');
      a.appendChild(article);

      let image = document.createElement('img');
      image.src = `${product.imageUrl}`;
      image.alt = `${product.altTxt}`;

      article.appendChild(image);

      let h3 = document.createElement('h3');
      h3.className = 'productName';
      h3.textContent = `${product.name}`;
      article.appendChild(h3);

      let p = document.createElement('p');
      p.className = 'productDescription';
      p.textContent = `${product.description}`;
      ('Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.');
      article.appendChild(p);
    }
};
