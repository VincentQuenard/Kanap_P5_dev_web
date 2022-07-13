const orderIdNumber = new URL(document.location).searchParams.get('orderId');
console.log(orderIdNumber);
const orderId = document.getElementById('orderId');
orderId.textContent = `${orderIdNumber}`;
localStorage.clear();
