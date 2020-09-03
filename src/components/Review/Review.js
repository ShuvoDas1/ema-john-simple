import React, { useEffect, useState } from 'react';
import {  getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';

const Review = () => {
    const {cart,setCart} = useState([])
    useEffect(() => {
        const saveCart = getDatabaseCart();
        // console.log(saveCart)
        const productKeys = Object.keys(saveCart);
        const counts =  productKeys.map(key => {
                const product = fakeData.find(pd => pd.key === key);
                product.quantity = saveCart[key];
                // console.log(product.quantity);
                return product;
        }) 
        setCart(counts);  
    })
    
    return (
        <div>
            <h1>This is review</h1>
        </div>
    );
};

export default Review;