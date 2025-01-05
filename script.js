const data = [
    { "fruit_name": "Apple", "price": 2.99 },
    { "fruit_name": "Banana", "price": 1.49 },
    { "fruit_name": "Orange", "price": 3.29 },
    { "fruit_name": "Strawberry", "price": 5.99 },
    { "fruit_name": "Grapes", "price": 4.49 },
    { "fruit_name": "Pineapple", "price": 3.49 },
    { "fruit_name": "Mango", "price": 2.89 },
    { "fruit_name": "Watermelon", "price": 0.99 },
    { "fruit_name": "Blueberry", "price": 6.99 },
    { "fruit_name": "Peach", "price": 3.79 }
];

const products = document.querySelector('.products');
const cart = document.querySelector('.cart');
const cartItems = {};

data.forEach((ele) => {
    let div = document.createElement('div');
    let p = document.createElement('p');
    let span = document.createElement('span');
    let quantityDiv = document.createElement('div');
    let sub = document.createElement('button');
    let add = document.createElement('button');
    let count = document.createElement('span');

    p.innerText = ele.fruit_name;
    let numPrice = parseFloat(ele.price);
    span.innerText = `$ ${numPrice}`;
    span.style.marginRight = '50px';
    p.append(span);
    div.append(p);

    products.appendChild(div);

    sub.innerText = '-';
    count.innerText = '0';
    add.innerText = '+';

    quantityDiv.append(sub);
    quantityDiv.append(count);
    quantityDiv.append(add);

    div.appendChild(quantityDiv);

    let value = 0;

    sub.addEventListener('click', () => {
        if (value > 0) {
            value--;
            count.innerText = value;
            updateCart(ele.fruit_name, ele.price, value);
        }
    });

    add.addEventListener('click', () => {
        value++;
        count.innerText = value;
        updateCart(ele.fruit_name, ele.price, value);
    });

    function updateCart(name, price, quantity) {
        if (!cartItems[name]) {
            let cartDiv = document.createElement('div');
            let cartP = document.createElement('p');
            cartP.innerText = `${name} ${quantity} x $${price}`;
            cartDiv.append(cartP);
            document.querySelector('.cart-items').appendChild(cartDiv);

            cartItems[name] = { cartDiv, cartP, quantity, price };
        } else {
            let cartProducts = cartItems[name];
            cartProducts.quantity = quantity;
            cartProducts.cartP.innerText = `${name} ${quantity} x $${price}`;
        }

        if (quantity === 0) {
            let cartProducts = cartItems[name];
            cartProducts.cartDiv.remove();
            delete cartItems[name];
        }

        updateTotal();
        displayEmptyMessage(); 
    }

    function updateTotal() {
        let total = 0;
        for (let item of Object.values(cartItems)) {
            total += item.quantity * item.price;
        }

        let totalDiv = document.querySelector('.cart-total');
        if (!totalDiv) {
            totalDiv = document.createElement('div');
            totalDiv.classList.add('cart-total');
            cart.appendChild(totalDiv);
        }
        totalDiv.innerText = `Total: $${total.toFixed(2)}`;
    }

    function displayEmptyMessage() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const emptyMessage = document.querySelector('.cart-empty');
        
        if (Object.keys(cartItems).length === 0) {
            if (!emptyMessage) {
                const message = document.createElement('div');
                message.classList.add('cart-empty');
                message.innerText = 'No fruits are added in the cart';
                cartItemsContainer.appendChild(message);
            }
        } 
        else {
            if (emptyMessage) {
                emptyMessage.remove();
            }
        }
    }
});