import React, { useState, useEffect } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products,setProduct] = useState([]);
    const [cart,setCart] = useState([]);
    
    useEffect(() =>{
        fetch('http://localhost:4000/products')
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        fetch('http://localhost:4000/productsByKeys',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(productKeys)
            })
            .then(res => res.json())
            .then(data => setCart(data))

    },[])
    const handleAddProduct = (product) =>{
        const sameProduct = cart.find(pd => pd.key === product.key);
        //  console.log(sameProduct);
        let count=1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key)
            // console.log(others);
             newCart = [...others,sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];

        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    return (
        <div className="shop-review-container">
            <div className="product-container">
            
            {
                products.map(product => <Product showDetail={false} key={product.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={product}></Product>)
            }
            
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="main-btn">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;