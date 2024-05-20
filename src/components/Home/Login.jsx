import {useState} from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";

const Login = () => {

    const [user,setUser] = useState({email:"",password:""})
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://food-king-server.vercel.app/api/v1/login", {
                email: user.email,
                password: user.password
            });

            const json = response.data;
            console.log(json);

            if (json.token) {
                // Save the auth token to local storage and redirect
                localStorage.setItem('userEmail', json.data.email);
                localStorage.setItem('token', json.token);
                navigate("/");
            } else {
                alert("Enter Valid user");
            }
        } catch (err) {
            console.error("Error during login:", err);
            alert("An error occurred. Please try again later.");
        }
    };




    const onChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }


    return (
        <div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={user.email} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={user.password} onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/signup" className="m-3 btn btn-outline-success">Sign Up</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
