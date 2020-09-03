import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    //   console.log(props)
   
    const { name, img, price, stock, seller,key,shipping } = props.product;
    // const [first,second] = props.product.features;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-info'>
                <h3 class='product-name'><Link to={"/product/" + key}>{name}</Link></h3>
                <small>by:{seller}</small>
                <br />
                <p>${price}</p>
                <p>only {stock} left in stock-order soon</p>
                {props.showDetail &&
                    <>
                        <p>Shipping cost: {shipping}</p>
                        {/* <h3>Features:</h3>
                        {/* <p>{first.description +":" + first.value}</p>
                        // <p>{second.description +":" + second.value}</p> */}
                    </>
                }
                {props.showAddToCart && <button class='main-btn' onClick={() => props.handleAddProduct(props.product)} ><FontAwesomeIcon icon={faCartPlus} />add to cart</button>}
            </div>
        </div>
    );
};

export default Product;