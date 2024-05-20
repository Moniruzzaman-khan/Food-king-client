import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const SignUp = () => {

    const navigate = useNavigate();
    const [user,setUser] = useState({name:"",email:"",password:"",location:""})

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://food-king-server.vercel.app/api/v1/registration", user)
            .then(result => {
                console.log(result);
                navigate("/login")
            })
            .catch(err => console.log(err));
    }

    const onChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }


    return (
        <div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={user.name} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={user.email} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={user.password} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" className="form-control" name='location' value={user.location} onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/login" className="m-3 btn btn-outline-success">Already registered</Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
