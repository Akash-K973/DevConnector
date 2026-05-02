import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "./utils/feedSlice";

const UserCard = ({user}) =>{
  if(!user) return;
    const dispatch = useDispatch();
    //console.log(user);
    const {_id,firstName,lastName,photoURl,age,gender,about,skills} = user;
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
    if(!user) return <h1>No more</h1>
    return (
<div className="userCard flex justify-center items-center card bg-base-300 w-96 shadow-sm">
  <figure className="h-60 w-60">
    <img className="outline outline-2 outline-violet-400 outline-offset-6 rounded-full"
      src={photoURl} 
      alt="photo" />
  </figure>
  <div className="card-body">
    <h3 className="text-sm text-gray-400 mb-2">Name :</h3>
    <h2 className="card-title">{firstName +" "+lastName}</h2>
    <h3 className="text-sm text-gray-400 mb-2">Age & Gender</h3>
    {age && gender && <p>{age + " " + gender}</p>}
    <h3 className="text-sm text-gray-400 mb-2">About :</h3>
    <p>{about}</p>
    <div className="mt-6">
          <h3 className="text-sm text-gray-400 mb-2">SKILLS</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="border border-gray-500 px-2 py-1 text-xs rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
    <div className="card-actions justify-end mt-5">
    <button className="ignore_btn btn btn-primary" onClick={()=> handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="accept_btn btn btn-secondary" onClick={()=> handleSendRequest("interested",_id)}>Send</button>
    </div>
  </div>
</div>
    )
}

export default UserCard;

