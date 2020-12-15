import React, { useState, useEffect } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products,setProduct] = useState([]);
    const [cart,setCart] = useState([]);
    const [search,setSearch] =  useState('');
    
    useEffect(() =>{
        fetch('https://protected-ravine-09230.herokuapp.com/products?search='+search)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[search])

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        fetch('https://protected-ravine-09230.herokuapp.com/productsByKeys',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(productKeys)
            })
            .then(res => res.json())
            .then(data => setCart(data))

    },[])

    const handleSearch = event =>{
        setSearch(event.target.value);
    }

    const handleAddProduct = (product) =>{
        const sameProduct = cart.find(pd => pd.key === product.key);
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
            <input type="text" onBlur={handleSearch} placeholder="Search Product" className='search-container'/>
            {
                products == 0 && <p>LOADING.....</p>
            }
            
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