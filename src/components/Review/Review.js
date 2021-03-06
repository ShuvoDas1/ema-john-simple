import React, { useEffect, useState} from 'react';
import {  getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import PlaceOrder from '../PlaceOrder/PlaceOrder';
import {  useHistory } from 'react-router-dom';
import happyImg from '../../images/giphy.gif';
const Review = () => {
        const [cart,setCart] = useState([]);
        const [orderPlaced,setPlaceOrder] = useState(false);
        const history = useHistory();
        const handleProceedCheckOut = () => {     
            history.push('/shipment')
        }

        useEffect((() =>{
            const saveCart = getDatabaseCart();
            const productKeys = Object.keys(saveCart);

            fetch('https://protected-ravine-09230.herokuapp.com/productsByKeys',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(productKeys)
            })
            .then(res => res.json())
            .then(data => setCart(data))

        }),[])

        const removeItem = (productKey) =>{
            const newCart = cart.filter(product => product.key !== productKey)
            setCart(newCart);
            removeFromDatabaseCart(productKey);
        }
        let thankyou;
        if(orderPlaced){
            thankyou = <img src={happyImg} alt=""/>
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
                {thankyou}
            </div>
            <div className='cart-container'>
                <Cart  cart={cart}>
                     <button className="main-btn" onClick={handleProceedCheckOut}>Proceed CheckOut</button>
                </Cart>
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