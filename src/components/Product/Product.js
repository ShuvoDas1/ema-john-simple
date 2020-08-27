import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
     console.log(props.product)
    const { name, img, price, stock, seller } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-info'>
                <h3 class='product-name'>{name}</h3>
                <small>by:{seller}</small>
                <br />
                <p>${price}</p>
                <p>only {stock} left in stock-order soon</p>
                <button class='main-btn' onClick={() => props.handleAddProduct(props.product)} ><FontAwesomeIcon icon={faCartPlus} />add to cart</button>
            </div>
        </div>
    );
};

export default Product;