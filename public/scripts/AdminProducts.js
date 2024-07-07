adminAuthentication();

const productContainer = document.getElementById('product-container');
const addProductButton = document.getElementsByClassName('add-product-btn')[0];

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
                <button type="button" class="edit-product-btn" id="${e._id}">Edit</button>
            </div>
            `
            productContainer.appendChild(newProduct);
        });
        await Promise.all(promises);

        Array.from(document.getElementsByClassName('edit-product-btn')).forEach(e=>{
            e.addEventListener('click', function() {
                window.location.href = `edit-product?productID=${e.id}`;
            });
        });
    })
    .catch(error => {
        console.error(`populateProducts() : ${error}`);
    });
}
populateProducts();

addProductButton.addEventListener('click', ()=>{
    window.location.href = 'add-product';
});