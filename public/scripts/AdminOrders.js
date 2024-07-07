adminAuthentication();

const orderContainer = document.getElementById('orders-container');

const fillCustomerName = (userID, e) =>{
    getUserName({userID})
    .then(name => {
        e.innerText = name;
    })
    .catch(error => {
        console.error(` fillCustomerName() : ${error}`);
    })
}

const populateOrders = () => {
    orderContainer.innerHTML = "";

    getAllOrders()
    .then(orders => {
        orders.forEach(async (order, i)=>{
            const newOrder = document.createElement('div');
            newOrder.id = order._id;
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
                <label class="tp-heading"> Status </label>
                <select class="order-status total-price-container">
                    <option value="Pending" style="color: orange;">Pending</option>
                    <option value="Order Placed" style="color: green;">Order Placed</option>
                    <option value="Processed" style="color: green;">Processed</option>
                    <option value="Shipped" style="color: green;">Shipped</option>
                    <option value="Out for delivery" style="color: green;">Out for delivery</option>
                    <option value="Delivered" style="color: green;">Delivered</option>
                    <option value="Cancelled" style="color: red;">Cancelled</option>
                </select>
            </div>
            <div>
                <span class="tp-heading">Total Price </span>
                <span class="total-price-container">&#8377; <span class="total-price">${order.totalPrice}</span></span>
            </div>
            `
            const orderStatus = header.getElementsByClassName('order-status')[0];
            for (let i=0; i<orderStatus.options.length; i++){
                if(orderStatus.options[i].value === order.status){
                    orderStatus.options[i].selected = true;
                }
            }

            if(orderStatus.value === "Pending"){
                orderStatus.style.color = "orange";
            }
            else if(orderStatus.value === "Cancelled"){
                orderStatus.style.color = "red";
            }

            orderStatus.addEventListener('change', ()=>{
                if(orderStatus.value === "Pending"){
                    orderStatus.style.color = "orange";
                }
                else if(orderStatus.value === "Cancelled"){
                    orderStatus.style.color = "red";
                }
                else{
                    orderStatus.style.color = "green";
                }
                const orderID = orderStatus.parentElement.parentElement.parentElement.id;
                changeOrderStatus({adminID:localStorage.getItem('userID'), orderID, status:orderStatus.value});
            });
            
            newOrder.appendChild(header);

            const orderDetails = document.createElement('div');
            orderDetails.classList.add('order-details');
            orderDetails.innerHTML = `
            <div class="pair">
                <div class="od-heading">Name </div>
                <div class="customer-name"></div>
            </div>
            <div class="pair">
                <div class="od-heading">Phone </div>
                <div class="tp-val">${order.phone}</div>
            </div>
            <div class="pair">
                <div class="od-heading">Address </div>
                <div class="tp-val">${order.address}</div>
            </div>
            `
            fillCustomerName(order.userID, orderDetails.getElementsByClassName('customer-name')[0]);
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