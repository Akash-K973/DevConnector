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
    if(!requests) return (
                        <div className="min-h-screen text-center my-10">
                        <h1 className="text-center">No request</h1>
                        </div>
                    );

    if(requests.length==0) return (
                        <div className="min-h-screen text-center my-10">
                            <h1 className="text-center">No request</h1>
                        </div>
                        )
    return (
        <>
            <div className="min-h-screen text-center my-10">
                <h1 className="text-bold white text-3xl">Requests</h1>
                {requests.map((request)=>{
                    const {_id,firstName,lastName,photoURl,about,gender,age}=request.fromUserId;
                    return(
                        <div key={request._id}className="request-card flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto h-45">
                            <div className="w-50 h-50 rounded-full">
                                <img className="outline outline-2 outline-violet-400 outline-offset-6 rounded-full" src={photoURl} alt="photo"/>
                            </div>
                            <div className="flex justify-between w-2/3">
                                <div className="text-left mx-4">
                                    <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                                    {age && gender && <p>{age+" "+gender}</p>}
                                <p>{about}</p>
                                </div>  
                                <div className="flex flex-col">
                                    <button className="reject-con-btn btn btn-primary mx-2 " onClick={()=>reviewRequest("rejected",request._id)}>reject</button>
                                    <button className="accept-con-btn btn btn-secondary mx-2 mt-2" onClick={()=>reviewRequest("accepted",request._id)}>accept</button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default Request;