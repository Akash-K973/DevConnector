import axios from "axios";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "./utils/requestSlice";

const Request = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests);

    const reviewRequest = async (status,_id) =>{
            try{
                const res = await axios.post("http://localhost:3000/request/review/"+status+"/"+_id,{},{
                    withCredentials:true,
                });
                dispatch(removeRequests(_id))
            }
            catch(err){
                console.log(err.message);
            }
        }
    const fetchRequests = async () =>{
        try{
            const res= await axios.get("http://localhost:3000/user/request/received",{
                withCredentials:true,
            })
            console.log(res);
            dispatch(addRequests(res.data.data));
        }
        catch(err){

        }

    }
    useEffect(()=>{
        fetchRequests();
    },[]);
    if(!requests) return <h1 className="text-center">No request</h1>;

    if(requests.length==0) return <h1>No request found</h1>
    return (
        <>
            <div className="text-center my-10">
                <h1 className="text-bold white text-3xl">Requests</h1>
                {requests.map((request)=>{
                    const {_id,firstName,lastName,photoURl,about,gender,age}=request.fromUserId;
                    return(
                        <div key={request._id}className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                            <div className="w-50 h-50 rounded-full">
                                <img src={photoURl} alt="photo"/>
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                                {age && gender && <p>{age+" "+gender}</p>}
                            <p>{about}</p>
                            </div>  
                            <div>
                                <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected",request._id)}>reject</button>
                                <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted",request._id)}>accept</button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default Request;