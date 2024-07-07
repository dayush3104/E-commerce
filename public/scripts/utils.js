const cartLength = document.getElementsByClassName('cart-length')[0];

const getCartLength = async () => {
    return fetch('/api/get-cart-length', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userID:localStorage.getItem('userID')})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) return data.length;
        else{
            console.log(`getCartLength() : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getCartLength() : ${data.error}`);
            }
            return 0;
        }
    })
    .catch(error => {
        console.error(`getCartLength() : ${error}`);
    });
}

const getTotalPrice = async () => {
    return fetch('/api/get-cart-total-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userID:localStorage.getItem('userID')})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) return data.totalPrice;
        else{
            console.log(`getTotalPrice() : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getTotalPrice() : ${data.error}`);
            }
            return 0;
        }
    })
    .catch(error => {
        console.error(`getTotalPrice() : ${error}`);
    });
}

const getProductQuantity = async (productID) => {
    return fetch('/api/get-product-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userID:localStorage.getItem('userID'), productID})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) return data.quantity;
        else{
            console.log(`getProductQuantity() : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getProductQuantity() : ${data.error}`);
            }
            return 0;
        }
    })
    .catch(error => {
        console.error(`getProductQuantity() : ${error}`);
    });
}

const getAllProducts = async ()=>{
    return fetch('/api/get-all-products', {method: 'POST'})
    .then(response => response.json())
    .then(data => {
        if(data.success) return data.products;
        else{
            console.log(`getAllProducts() : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getAllProducts() : ${data.error}`);
            }
            return [];
        }
    })
    .catch(error => {
        console.error(`getAllProducts() : ${error}`);
    });
}

const getCart = async ()=>{
    return fetch('/api/get-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userID:localStorage.getItem('userID')})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) return data.cart;
        else{
            console.log(`getCart() : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getCart() : ${data.error}`);
            }
            return;
        }
    })
    .catch(error => {
        console.error(`getCart() : ${error}`);
    });
}

const getProduct = async (productID)=>{
    return fetch('/api/get-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productID})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) return data.product;
        else{
            console.log(`getProduct() : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getProduct() : ${data.error}`);
            }
            return;
        }
    })
    .catch(error => {
        console.error(`getProduct() : ${error}`);
    });
}

const getProductPrice = async (productID)=>{
    return fetch('/api/get-product-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productID})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) return data.price;
        else{
            console.log(`getProductPrice() : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getProductPrice() : ${data.error}`);
            }
            return 0;
        }
    })
    .catch(error => {
        console.error(`getProductPrice() : ${error}`);
    });
}

const addToCart = async (body)=>{
    return fetch('/api/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        if(!data.success){
            console.log(`addToCart(${body}) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`addToCart() : ${data.error}`);
            }
        }
    })
    .catch(error => {
        console.error(`addToCart(${body}) : ${error}`);
    });
}

const delFromCart = async (body) => {
    return fetch('/api/del-from-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        if(!data.success){
            console.log(`delFromCart(${body}) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`delFromCart() : ${data.error}`);
            }
        }
    })
    .catch(error => {
        console.error(`delFromCart(${body}) : ${error}`);
    });
}

const decreaseQuantity = async (body) => {
    return fetch('/api/decrease-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        if(!data.success){
            console.log(`decreaseQuantity(${body}) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`decreaseQuantity() : ${data.error}`);
            }
        }
    })
    .catch(error => {
        console.error(`decreaseQuantity(${body}) : ${error}`);
    });
}

const getUserOrders = async () => {
    return fetch('/api/get-user-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userID:localStorage.getItem('userID')})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) return data.orders;
        else{
            console.log(`getUserOrders() : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getUserOrders() : ${data.error}`);
            }
            return [];
        }
    })
    .catch(error => {
        console.error(`getUserOrders() : ${error}`);
    });
}

const getAllOrders = async () => {
    return fetch('/admin/get-all-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({adminID:localStorage.getItem('userID')})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) return data.orders;
        else{
            console.log(`getAllOrders() : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getAllOrders() : ${data.error}`);
            }
            return [];
        }
    })
    .catch(error => {
        console.error(`getAllOrders() : ${error}`);
    });
}

const changeOrderStatus = async (body) => {
    return fetch('/admin/change-order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        if(!data.success){
            console.log(`changeOrderStatus(${body}) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`changeOrderStatus() : ${data.error}`);
            }
        }
    })
    .catch(error => {
        console.error(`changeOrderStatus(${body}) : ${error}`);
    });
}

const getUserName = async (body) => {
    return fetch('/api/get-user-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            return data.name;
        }
        else{
            console.log(`getUserName(${body}) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getUserName() : ${data.error}`);
            }
            return "";
        }
    })
    .catch(error => {
        console.error(`getUserName(${body}) : ${error}`);
    });
}

const getUserContact = async (body) => {
    return fetch('/api/get-user-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            return data.contact;
        }
        else{
            console.log(`getUserContact(${body}) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`getUserContact() : ${data.error}`);
            }
            return {address: "", phone: ""};
        }
    })
    .catch(error => {
        console.error(`getUserContact(${body}) : ${error}`);
    });
}

const adminAuthentication = async () => {
    return fetch('/admin/authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({adminID:localStorage.getItem('userID')})
    })
    .then(response => response.json())
    .then(data => {
        if(!data.success){
            console.log(`adminAuthentication() : AUTHENTICATION FAILED`);
            window.location.href = '/user/login';
            return false;
        }
        else{
            return true;
        }
    })
    .catch(error => {
        console.error(`adminAuthentication() : ${error}`);
    });
}

const isLoggedIn = ()=>{
    if(localStorage.getItem('isLoggedIn') === false || localStorage.getItem('userID') === ''){
        window.location.href = '/';
    }
}