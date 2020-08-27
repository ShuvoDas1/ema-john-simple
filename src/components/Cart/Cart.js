import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total,product)=> total+product.price,0)
    let shipping =0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const formatNumber =(num) =>{
        return num.toFixed(2);
    }
    const tax = total / 10;
    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h2>Ordered Summary</h2>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Tax + VAT: {formatNumber(tax)}</small></p>
            <p><small>Shipping: {shipping}</small></p>
            <p>Total Price: ${formatNumber(grandTotal)} </p>
        </div>
    );
};

export default Cart;