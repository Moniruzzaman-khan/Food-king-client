import {useCart, useDispatchCart} from "../ContextReducer.jsx";
import trash from '../../assets/trash.svg'
import axios from "axios";

const Cart = () => {

    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-white'>Cart is Empty</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            console.error("User email not found in localStorage.");
            return;
        }
        try {
            let response = await axios.post("https://food-king-server.vercel.app/api/v1/orderData", {
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            });
            console.log("JSON RESPONSE STATUS:::::", response.status);
            if (response.status === 200) {
                dispatch({ type: "DROP" });
            } else {
                console.error("Failed to place order. Response status:", response.status);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    let totalPrice = data.reduce((total,food) => total + food.price,0)

    return (
        <div> <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success'>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Option</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Remove</th>
                </tr>
                </thead>

                <tbody className='text-white' style={{backgroundColor: 'gray'}}>
                {data.map((food,index) => (
                    <tr>
                        <th scope='row'>{index + 1}</th>
                        <td>{food.name}</td>
                        <td>{food.qty}</td>
                        <td>{food.size}</td>
                        <td>{food.price}</td>
                        <td><button type='button' className='btn p-0'> <img src={trash} alt="delete" onClick={() => {dispatch({type: "REMOVE",index:index})}}/> </button></td>
                    </tr>
                ))}

                </tbody>
            </table>
            <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}</h1></div>
            <div>
                <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut}>Check Out</button>
            </div>
        </div>

        </div>
    );
};

export default Cart;
