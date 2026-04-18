import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';

const EditProfile = ({user}) =>{
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [photoURl,setPhotoURl] = useState(user.photoURl);
    const [age,setAge] = useState(user.age || " ");
    const [gender,setGender] = useState(user.gender);
    const [about,setAbout] = useState(user.about);
    const [err,setError] = useState(" ")

    const [showTost,setShowTost] = useState(false)
    const dispatch = useDispatch();

    const saveProfile = async () =>{
        try{
            const res = await axios.patch(
                    "http://localhost:3000/profile/edit"
                ,{
                    firstName,lastName,photoURl,age,gender,about
                },{
                    withCredentials:true,
                }
            );
            dispatch(addUser(res?.data?.data));
            setShowTost(true);
            const i = setTimeout(() => {
                setShowTost(false);
            },3000);
        }
        catch(err){

        }
    }
    return (
        <>
           <div className="flex flex-col md:flex-row justify-center gap-10 mt-10 ">
                <div className="card-body bg-base-300 max-w-100">
                    <h2 className="card-title px-30">Edit Profile</h2>
                    <fieldset className="fieldset">
                            <legend className="fieldset-legend">firstName</legend>
                        <input type="text" className="input" placeholder="Enter firstName" onChange={(e)=>{setFirstName(e.target.value)}}/>
                    </fieldset>
                    <fieldset className="fieldset">
                            <legend className="fieldset-legend">lastName</legend>
                        <input type="text" className="input" placeholder="Enter lastName" onChange={(e)=>{setLastName(e.target.value)}}/>
                    </fieldset>
                    <fieldset className="fieldset">
                            <legend className="fieldset-legend">age</legend>
                        <input type="text" className="input" placeholder="Enter Age" onChange={(e)=>{setAge(e.target.value)}}/>
                    </fieldset>
                    <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender</legend>
                        <input type="text" className="input" placeholder="Enter Gender" onChange={(e)=>{setGender(e.target.value)}}/>
                    </fieldset>
                    <fieldset className="fieldset">
                            <legend className="fieldset-legend">About</legend>
                        <input type="text" className="input" placeholder="Enter About" onChange={(e)=>{setAbout(e.target.value)}}/>
                    </fieldset>
                    <fieldset className="fieldset">
                            <legend className="fieldset-legend">PhotoURL</legend>
                        <input type="text" className="input" placeholder="Enter PhotoURL (Url only)" onChange={(e)=>{setPhotoURl(e.target.value)}}/>
                    </fieldset>
                    <p>{err}</p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary" onClick={saveProfile}>Save</button>
                    </div>
                </div>
                <div className="mt-2">
                    <UserCard user={{firstName,lastName,photoURl,age,gender,about}}/>
                    {showTost&&
                        <div className="toast toast-top toast-center">
                            <div className="alert alert-success">
                                <span>Profile Saved</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
            
            
        </>
    )
}

export default EditProfile;