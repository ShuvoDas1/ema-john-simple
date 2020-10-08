import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const saveCart = getDatabaseCart();
    const onSubmit = data => {
        const order = { ...loggedInUser, product: saveCart, data, orderTime: new Date() }
        fetch('https://protected-ravine-09230.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('Your ordered successfully')
                }
            })
    }

    console.log(watch("example")); // watch input value by passing the name of it

    return (
       
            <div className="row mt-5">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input name="name" defaultValue={loggedInUser.name} className="form-control" ref={register} />
                        <br />
                        <input name="email" defaultValue={loggedInUser.email} className="form-control" ref={register} />
                        <br />
                        <input name="address" placeholder="Your address" className="form-control" ref={register({ required: true })} />
                        {errors.address && <span>This field is required</span>}
                        <br />
                        <input name="phoneNumber" className="form-control" placeholder='Your phoneNumber' ref={register({ required: true })} />
                        {errors.phoneNumber && <span>This field is required</span>}
                        <br />
                        <input type="submit" className="form-control" />
                    </form>
                </div>
                <div className="col-md-6">
                    <ProcessPayment></ProcessPayment>
                </div>
            </div>
    );
};

export default Shipment;