import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const prod = fakeData.find(pd => pd.key === productKey)
    // console.log(prod);
    return (
        <div>
           
            <h1>Product Detail:</h1>
            <Product showDetail={true} showAddToCart={false} product={prod}>
            </Product>
        </div>
    );
};

export default ProductDetail;