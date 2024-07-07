adminAuthentication();

const AddProductForm = document.getElementById('AddProduct');

AddProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const imageURL = document.getElementById('imageURL').value;
    const price = document.getElementById('price').value;
    const tags = document.getElementById('tags').value.split(',').map((tag) => { return tag.trim(); });

    await fetch('/admin/add-product', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({adminID:localStorage.getItem('userID'),name,description,imageURL,price,tags})
    })
    .then(response => response.json())
    .then(data => {
		if(data.success){
            AddProductForm.reset();
			window.location.href = 'products';
		}
		else{
            console.log(`(AddProduct.js) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`(AddProduct.js) : ${data.error}`);
            }
        }
    })
    .catch(error => {
        console.error(`(AddProduct.js) : ${error}`);
    });
});