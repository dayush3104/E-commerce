isLoggedIn();

const productContainer = document.getElementById('product-container');

const updateCartLength = ()=>{
    getCartLength()
    .then(length => {
        cartLength.innerText = length;
    })
    .catch(error => {
        console.error(`updateCartLength() : ${error}`);
    });
}
updateCartLength();

const populateProducts = ()=>{
    productContainer.innerHTML = "";
    
    getAllProducts()
    .then(async products => {
        const promises = products.map((e) => {
            const newProduct = document.createElement('div');
            newProduct.classList.add('product-card');
            newProduct.innerHTML = `
            <img src="${e.imageURL}" alt="${e.name}">
            <h2 class="product-name">${e.name}</h2>
            <p class="product-description">${e.description}</p>
            <div class="card-bottom">
                <span class="product-price">&#8377; ${e.price}</span>
                <button type="button" class="add-to-cart-btn" id="${e._id}">Add to Cart</button>
            </div>
            `
            productContainer.appendChild(newProduct);
        });
        await Promise.all(promises);
        
        Array.from(document.getElementsByClassName('add-to-cart-btn')).forEach(e=>{
            e.addEventListener('click', function() {
                addToCart({userID:localStorage.getItem('userID'), productID:e.id})
                .then(()=>{
                    updateCartLength();
                })
            });
        });
    })
    .catch(error => {
        console.error(`populateProducts() : ${error}`);
    });
}
populateProducts();