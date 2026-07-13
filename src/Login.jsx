import { useState } from 'react';
import  axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { Navigate, useNavigate } from 'react-router';

const Login = () =>{
    const [firstName,setFirstName] = useState("  ");
    const [lastName,setLastName] = useState("  ");
    const [emailId,setEmail] = useState("rdj123@gmail.com")
    const [password,setPassword] = useState("rdj@12345");
    const [isLoginForm,setIsLoginForm] = useState(true);
    const [err,setError] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await axios.post("http://localhost:3000/login",{
                emailId,
                password
            },{withCredentials:true});
            dispatch(addUser(res.data));
            return navigate("/feed");
        }
        catch(err){
            setError(err.response.data);
            console.log(err);
        }
    }

    const handleSignUp = async () =>{
        try{
             const res = await axios.post("http://localhost:3000/signup",{
                firstName,
                lastName,
                emailId,
                password
            },{withCredentials:true});
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        }
        catch(err){
            console.log("ERROR: "+err.message);
        }
    }

    return (
        <>
        <div className='min-h-screen'>
            <div className="card w-96 bg-base-300 card-md shadow-sm mx-auto mt-10">
            <div className="card-body">
                <h2 className="card-title px-30">{isLoginForm?"SignUp":"Login"}</h2>
                { isLoginForm &&
                <>
                <fieldset className="fieldset">
                     <legend className="fieldset-legend">First Name</legend>
                    <input type="text" className="input" placeholder="Enter Email" onChange={(e)=>{setFirstName(e.target.value)}}/>
                </fieldset>
                <fieldset className="fieldset">
                     <legend className="fieldset-legend">LastName</legend>
                    <input type="text" className="input" placeholder="Enter Email" onChange={(e)=>{setLastName(e.target.value)}}/>
                </fieldset>
                </>
                }
                <fieldset className="fieldset">
                     <legend className="fieldset-legend">Email</legend>
                    <input type="text" className="input" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </fieldset>
                <fieldset className="fieldset">
                     <legend className="fieldset-legend">Password</legend>
                    <input type="password" className="input" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </fieldset>
                <p>{err}</p>
                <div className="justify-end card-actions">
                <button className="btn btn-primary" onClick={isLoginForm ? handleSignUp:handleLogin}>Login</button>
                </div>
                <p onClick={()=>setIsLoginForm(isLoginForm?false:true)}>{isLoginForm?"Already Signed Up?":"New User?"}</p>
            </div>
            </div>
            </div>
        </>
    )
}

export default Login;








