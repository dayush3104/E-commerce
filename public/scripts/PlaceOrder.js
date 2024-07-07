isLoggedIn();

const totalPrice = document.getElementsByClassName('total-price')[0];
const placeOrderButton = document.getElementsByClassName('place-order-btn')[0];
const orderForm = document.getElementById('orderForm');
const cartContainer = document.getElementsByClassName('cart-container')[0];

const updateCartLength = ()=>{
    getCartLength()
    .then(length => {
        cartLength.innerText = length;

        if(length < 1) placeOrderButton.style.display = "none";
        else placeOrderButton.style.display = "";
    })
    .catch(error => {
        console.error(`updateCartLength() : ${error}`);
    });
}
updateCartLength();

const updateTotalPrice = ()=>{
    getTotalPrice()
    .then(price => {
        totalPrice.innerText = price;
    })
    .catch(error => {
        console.error(`updateTotalPrice() : ${error}`);
    });
}
updateTotalPrice();

const populateCart = async ()=>{
    cartContainer.innerHTML = "";

    getCart()
    .then(async cart => {
        const products = cart.products;
        products.map(async (e) => {
            await getProduct(e.productID)
            .then(product => {
                const newProduct = document.createElement('div');
                newProduct.classList.add('product-card');
                newProduct.innerHTML = `
                <img src="${product.imageURL}" alt="${product.name}">
                <h2 class="product-name">${product.name}</h2>
                <div class="pairs">
                    <div class="key"> Price </div>
                    <div class="value">&#8377; ${product.price}</div>
                </div>
                <div class="pairs">
                    <div class="key"> Quantity </div>
                    <div class="value">${e.quantity}</div>
                </div>
                <div class="pairs">
                    <div class="key"> Subtotal </div>
                    <div class="value">&#8377; ${product.price * e.quantity}</div>
                </div>
                `
                cartContainer.appendChild(newProduct);
            })
            .catch(error => {
                console.log(error);
            })
        });
    })
    .catch(error => {
        console.error(`populateCart() : ${error}`);
    });
}
populateCart();

const fillDetails = ()=>{
    getUserContact({userID:localStorage.userID})
    .then(contact => {
        document.getElementById('address').value = contact.address;
        document.getElementById('phone').value = contact.phone;
    })
    .catch(error => {
        console.error(` fillDetails() : ${error}`);
    });
}
fillDetails();

orderForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const userID = localStorage.getItem('userID');

    fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userID,address,phone})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            orderForm.reset();
            window.location.href = '/user/home';
        }
        else{
            console.log(`(PlaceOrder.js) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`(PlaceOrder.js) : ${data.error}`);
            }
        }
    })
    .catch(error => {
        console.error(`(PlaceOrder.js) : ${error}`);
    });
});