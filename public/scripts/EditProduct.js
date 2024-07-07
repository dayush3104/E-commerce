adminAuthentication();

const EditProductFrom = document.getElementById('EditProduct');
const productID = window.location.search.slice(1).split('=')[1];

getProduct(productID)
.then(product => {
    document.getElementById('name').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('imageURL').value = product.imageURL;
    document.getElementById('price').value = product.price;
    document.getElementById('tags').value = product.tags.join(', ');
})
.catch(error => {
    console.error(`(EditProduct.js) : ${error}`);
});

EditProductFrom.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const imageURL = document.getElementById('imageURL').value;
    const price = document.getElementById('price').value;
    const tags = document.getElementById('tags').value.split(',').map((tag) => { return tag.trim(); });

    await fetch('/admin/edit-product', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({adminID:localStorage.getItem('userID'), productID, product:{name,description,imageURL,price,tags}})
    })
    .then(response => response.json())
    .then(data => {
		if(data.success){
            EditProductFrom.reset();
			window.location.href = 'products';
		}
		else{
            console.log(`(EditProduct.js) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`(EditProduct.js) : ${data.error}`);
            }
        }
    })
    .catch(error => {
        console.error(`(EditProduct.js) : ${error}`);
    });
});