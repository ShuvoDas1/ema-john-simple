import React, { useEffect, useState } from 'react';
import {  getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import PlaceOrder from '../PlaceOrder/PlaceOrder';

const Review = () => {
        const [cart,setCart] = useState([])
        useEffect((() =>{
            const saveCart = getDatabaseCart();
            const productKeys = Object.keys(saveCart);
            const counts =  productKeys.map(key => {
                const product = fakeData.find(pd => pd.key === key)
                product.quantity = saveCart[key];
                return product;
            })
            setCart(counts);
        }),[])
        const removeItem = (productKey) =>{
            const newCart = cart.filter(product => product.key !== productKey)
            setCart(newCart);
            removeFromDatabaseCart(productKey);
        }
//     const [cart,setCart] = useState([]);
//     const removeItem = (productKey) =>{
//         const newCart = cart.filter(pd => pd.key !== productKey);
//         setCart(newCart);
//         removeFromDatabaseCart(productKey);
//     }
//    useEffect(() => {
//         const saveCart = getDatabaseCart();
//         const productKeys = Object.keys(saveCart);
//         // console.log(productKeys);
//         const counts = productKeys.map(key => {
//             const product = fakeData.find(pd => pd.key === key);
//             product.quantity =  saveCart[key];
//             return product;
//         })
//          setCart(counts);
//    },[])

  
    return (
       <div className='shop-review-container'> 
            
            <div className='product-container'>
                <h1>Cart item: {cart.length}</h1>
                {
                    cart.map(product => <ReviewItem removeItem = {removeItem} product={product}></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>


            {/* <div className = 'product-container'>
            <h1>Cart Item: {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem removeItem={removeItem} product={pd}></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                 <Cart cart={cart}></Cart>
            </div> */}
       </div> 
    );
};

export default Review;