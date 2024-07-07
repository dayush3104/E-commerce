isLoggedIn();

const orderContainer = document.getElementById('orders-container');

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

const populateOrders = () => {
    orderContainer.innerHTML = "";

    getUserOrders()
    .then(orders => {
        orders.forEach(async (order, i)=>{
            const newOrder = document.createElement('div');
            orderContainer.appendChild(newOrder);

            newOrder.classList.add('order-card');
            
            const header = document.createElement('div');
            header.classList.add('header');
            header.innerHTML = `
            <div>
                <span class="tp-heading">ORDER </span>
                <span class="total-price-container">${i+1}</span>
            </div>
            <div>
                <span class="tp-heading">Status : </span>
                <span class="status">${order.status}</span>
            </div>
            <div>
                <span class="tp-heading">Total Price </span>
                <span class="total-price-container">&#8377; <span class="total-price">${order.totalPrice}</span></span>
            </div>
            `
            const orderStatus = header.getElementsByClassName('status')[0];
            if(orderStatus.innerText === "Pending"){
                orderStatus.style.color = "orange";        
            }
            else if(orderStatus.innerText === "Cancelled"){
                orderStatus.style.color = "red";    
            }
            newOrder.appendChild(header);

            const orderDetails = document.createElement('div');
            orderDetails.classList.add('order-details');
            orderDetails.innerHTML = `
            <div class="pair">
                <div class="od-heading">Phone </div>
                <div class="tp-val">${order.phone}</div>
            </div>
            <div class="pair">
                <div class="od-heading">Address </div>
                <div class="tp-val">${order.address}</div>
            </div>
            `
            newOrder.appendChild(orderDetails);

            const products = order.products;
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
                    newOrder.appendChild(newProduct);
                    newOrder.appendChild(document.createElement('hr'));
                })
                .catch(error => {
                    console.error(`getProduct() : ${error}`);
                });
            })
        })
    })
    .catch(error => {
        console.error(`populateOrders() : ${error}`);
    });
}
populateOrders();
