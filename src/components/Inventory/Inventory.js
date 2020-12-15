import React, { useState } from 'react';
import fakeData from '../../fakeData';
import { useForm } from "react-hook-form";
import './Inventory.css'
const Inventory = () => {

    const [productInfo, setProductInfo] = useState({});
    const [file, setFile] = useState(null);
    // const { register, handleSubmit, watch, errors } = useForm();

    const handleFileChange = (e) => {
        const newFile = e.target.files;
        setFile(newFile);
        console.log(newFile);
    }
    
    const handleBlur = (e) => {
        const newInfo = { ...productInfo };
        newInfo[e.target.name] = e.target.value;
        setProductInfo(newInfo);
        console.log(newInfo);
    }


    const handleSubmit = (e) => {
        const formData = new FormData()
        formData.append('file', file[0])
        formData.append('name', productInfo.name)
        formData.append('stock', productInfo.stock)
        formData.append('seller', productInfo.seller)
        formData.append('price', productInfo.price)

        fetch('http://localhost:4000/addProduct', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
        e.preventDefault();
    }

    // console.log(watch("example"));

    return (
        <section className='mt-5'>
            <div className='container'>
                <h3>Add a new product</h3>
                <form onSubmit={handleSubmit} className='new-product'>
                    <input name="name" onBlur={handleBlur} className='form-control mt-3' placeholder='product Name' />
                    {/* {errors.name && <span>This field is required</span>} */}
                    <input name="stock" onBlur={handleBlur} className='form-control mt-3' placeholder='product Stock' />
                    {/* {errors.name && <span>This field is required</span>} */}
                    <input name="price" onBlur={handleBlur} className='form-control mt-3' placeholder='product Price' />
                    <input name="seller" onBlur={handleBlur} className='form-control mt-3' placeholder='Seller' />
                    {/* {errors.price && <span>This field is required</span>} */}
                    <input name="file" type='file' onChange={handleFileChange} className='form-control mt-3' />
                    {/* {errors.name && <span>This field is required</span>} */}

                    <input type="submit" className='form-control mt-3' />
                </form>
            </div>
        </section>
    );
};

export default Inventory;