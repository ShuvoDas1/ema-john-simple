import React from 'react';

const PlaceOrder = (props) => {
    console.log(props);
    const cart = props.cart;
    const totalPrice = cart.reduce((total,product)=> total + product.price,0)
    console.log(totalPrice);
    const quantity = cart.map(pd => pd.quantity)
    const user ={name:'shuvo',job:'bekar'}
    const values = Object.keys(user);
    // console.log(values)
    
    return (
        <div>
           <h1>This is place holder</h1>
            <h4>Order Item: {cart.length}</h4>
            <br/>
        </div>
    );
};

export default PlaceOrder;