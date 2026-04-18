import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "./utils/feedSlice";

const UserCard = ({user}) =>{
  if(!user) return;
    const dispatch = useDispatch();
    const {_id,firstName,lastName,photoURl,age,gender,about} = user;
    const handleSendRequest = async (status,userId) =>{
      try{
        const res = axios.post("http://localhost:3000/sendConnectionRequest/send/"+status+"/"+userId,{},{
          withCredentials:true,
        });
        dispatch(removeFeed(userId))
      }
      catch(err){

      }
    }
    console.log(photoURl);
    if(!user) return <h1>No more</h1>
    return (
<div className="card flex bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoURl} 
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+lastName}</h2>
    {age && gender && <p>{age + " " + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-end">
    <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=> handleSendRequest("interested",_id)}>Send</button>
    </div>
  </div>
</div>
    )
}

export default UserCard;

