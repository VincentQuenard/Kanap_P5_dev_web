//On récupère le numéro de commande contenue dans l'url
const orderIdNumber = new URL(document.location).searchParams.get('orderId');

//On sélectionne la balise html où doit être affiché le numéro de conmmande et on l'affiche
const orderId = document.getElementById('orderId');
orderId.textContent = `${orderIdNumber}`;


