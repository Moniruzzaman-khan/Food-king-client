import NavBar from "../components/common/NavBar.jsx";
import Footer from "../components/common/Footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const MyOrders = () => {


    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            console.log(localStorage.getItem('userEmail'));
            const response = await axios.post('https://food-king-server.vercel.app/api/v1/myOrderData', {
                email: localStorage.getItem('userEmail'),
            });
            setOrderData(response.data);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div className='container'>
                <div className='row'>
                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div className='row mb-3' >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>
                                                            {data = arrayData.Order_date}
                                                            <hr />
                                                        </div> :
                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ৳{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default MyOrders;
