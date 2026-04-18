import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice";
import { Link } from "react-router";

const Connections = () =>{
    const user = useSelector((store)=>store.user);
    const connections = useSelector((store)=>store.connections);
    const dispatch = useDispatch();
    //console.log(connections);

    const fetchConnections = async () =>{
        try{
            const res = await axios.get("http://localhost:3000/user/connections",{
                withCredentials:true
            });
            dispatch(addConnections(res.data.data));
        }
        catch(err){

        }
    };
    useEffect(()=>{
        fetchConnections();
    },[]);

    if(!connections) return (
        <>
         Connection failed!
        </>
    );

    if(connections.length==0) return <h1 className="text-center">No connnection found</h1>
    return (
        <>
            <div className="text-center my-10">
                <h1 className="text-bold white text-3xl">Connections</h1>
                {connections?.map((connection)=>{
                    const {_id,firstName,lastName,photoURl,about,gender,age}=connection;
                    return(
                        <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
                            <div className="w-50 h-50 rounded-full">
                                <img src={photoURl}  width="100px" height="100px" alt="photo"/>
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                                {age && gender && <p>{age+" "+gender}</p>}
                            <p>{about}</p>
                            </div>  
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Connections;