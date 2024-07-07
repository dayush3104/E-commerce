isLoggedIn();

const cartContainer = document.getElementById('cart-container');
const totalPrice = document.getElementsByClassName('total-price')[0];
const buyNowButton = document.getElementsByClassName('buy-now-btn')[0];

const updateCartLength = ()=>{
    getCartLength()
    .then(length => {
        cartLength.innerText = length;

        if(length < 1) buyNowButton.style.display = "none";
        else buyNowButton.style.display = "";
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

const updateSubtotalAndQuantity = (e) => {
    const productID = e.parentElement.id;
    getProductQuantity(productID)
    .then(quantity => {
        e.getElementsByClassName('quantity')[0].innerText = quantity;
        
        getProductPrice(productID)
        .then(price => {
            e.getElementsByClassName('subtotal')[0].innerText = price * quantity;
        })
        .catch(error => {
            console.error(`getProductPrice() : ${error}`);
        });
    })
    .catch(error => {
        console.error(`updateSubtotalAndQuantity() : ${error}`);
    });
}

const populateCart = () => {
    cartContainer.innerHTML = "";
    
    getCart()
    .then(async cart => {
        const products = cart.products;
        const promises =  products.map(async (e) => {
            await getProduct(e.productID)
            .then(product => {
                const newProduct = document.createElement('div');
                newProduct.classList.add('product-card');
                newProduct.id = e.productID;
                newProduct.innerHTML = `
                <img src="${product.imageURL}" alt="${product.name}">
                <div class="middle-part">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                </div>
                <div class="right-part">
                    <div class="pairs">
                        <div class="key"> Price Per Piece </div>
                        <div class="value">&#8377; ${product.price}</div>
                    </div>
                    <div class="pairs">
                        <div class="key"> Subtotal </div>
                        <div class="value">&#8377; <span class="subtotal">${e.quantity * product.price}</span></div>
                    </div>
                    <div class="buttons">
                        <button type="button" class="neg-btn">-</button>
                        <div class="quantity">${e.quantity}</div>
                        <button type="button" class="pos-btn">+</button><br>
                    </div>
                    <button type="button" class="del-from-cart-btn">Remove</button>
                </div>
                `
                cartContainer.appendChild(newProduct);
            })
            .catch(error => {
                console.error(`getProduct() : ${error}`);
            });
        })
        await Promise.all(promises);

        Array.from(document.getElementsByClassName('del-from-cart-btn')).forEach(e=>{
            e.addEventListener('click', function() {
                const productID = e.parentElement.parentElement.id;
                delFromCart({userID:localStorage.getItem('userID'), productID})
                .then(()=>{
                    e.parentElement.parentElement.remove();
                    updateCartLength();
                    updateTotalPrice();
                })
            });
        })

        Array.from(document.getElementsByClassName('pos-btn')).forEach(e=>{
            e.addEventListener('click', function() {
                const productID = e.parentElement.parentElement.parentElement.id;
                addToCart({userID:localStorage.getItem('userID'), productID})
                .then(()=>{
                    updateTotalPrice();
                    updateSubtotalAndQuantity(e.parentElement.parentElement);
                })
            });
        })

        Array.from(document.getElementsByClassName('neg-btn')).forEach(e=>{
            e.addEventListener('click', function() {
                const productID = e.parentElement.parentElement.parentElement.id;
                decreaseQuantity({userID:localStorage.getItem('userID'), productID})
                .then(()=>{
                    updateTotalPrice();
                    updateSubtotalAndQuantity(e.parentElement.parentElement);
                })
            });
        })

    })
    .catch(error => {
        console.error(`populateCart() : ${error}`);
    });
}
populateCart();

buyNowButton.addEventListener('click', ()=>{
    window.location.href = "place-order";
})