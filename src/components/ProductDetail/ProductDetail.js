import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product,setProduct] =  useState({})
    useEffect(() =>{
        fetch('http://localhost:4000/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])

    // const prod = fakeData.find(pd => pd.key === productKey)
    // console.log(prod);
    return (
        <div>
           
            <h1>Product Detail:</h1>
            <Product showDetail={true} showAddToCart={false} product={product}>
            </Product>
        </div>
    );
};

export default ProductDetail;