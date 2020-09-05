import React from 'react';

const ReviewItem = (props) => {
        // console.log(props.product);
        const {name,quantity,seller,key,price} = props.product;
    // console.log(props);
    // const {name,quantity,key,price} = props.product;
    const reviewItemStyle={
        borderBottom: '1px solid grey',
        paddingBottom: '10px',
        marginLeft: '100px'
    }
    return (
        <div style={reviewItemStyle}>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Sold By: {seller}</p>
            <p>Price: {price}</p>
            <br/>
            <button className='main-btn' onClick={() => props.removeItem(key)}>Remove</button>
            {/* <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <br/>
            <button className="main-btn" onClick={() => props.removeItem(key)}>Remove</button> */}
        </div>
    );
};

export default ReviewItem;