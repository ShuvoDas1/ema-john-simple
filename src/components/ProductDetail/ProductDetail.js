import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [loading,setLoading] = useState(true)
    const [product,setProduct] =  useState({})
    useEffect(() =>{
        fetch('https://protected-ravine-09230.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
            setLoading(false);
        })
    },[productKey])

    // const prod = fakeData.find(pd => pd.key === productKey)
    // console.log(prod);
    return (
        <div>
           
            <h1>Product Detail:</h1>

            {
                loading ? <p>Loading...</p> : <Product showDetail={true} showAddToCart={false} product={product}>
                </Product>
            }
        </div>
    );
};

export default ProductDetail;