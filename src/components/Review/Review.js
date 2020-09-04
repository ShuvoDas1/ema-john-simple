import React, { useEffect, useState } from 'react';
import {  getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import PlaceOrder from '../PlaceOrder/PlaceOrder';

const Review = () => {
    const [cart,setCart] = useState([]);
   useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        console.log(productKeys);
        const counts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity =  saveCart[key];
            return product;
        })
         setCart(counts);
   },[])

  
    return (
       <div className ='shop-container'> 
            <div className = 'product-container'>
            <h1>Cart Item: {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem product={pd}></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <PlaceOrder cart={cart}></PlaceOrder>
            </div>
       </div> 
    );
};

export default Review;