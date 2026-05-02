import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from './UserCard'
import axios from "axios";
import {addFeed , removeFeed} from "./utils/feedSlice"
import ProfileCard from "./Components/ProfileCard";
import InfoCard from "./Components/InfoCard";

const Feed = () =>{
    const user = useSelector((store)=>store.user);
    const feed = useSelector((store)=>store.feed)
    const dispatch = useDispatch();
    const getFeed = async() =>{
        if(feed) return;
        try{
            const res = await axios.get("http://localhost:3000/feed",{
                withCredentials:true
            });
            dispatch(addFeed(res?.data?.data));
           }
        catch(err){
            console.log(err.message)
        }
    }
    
    useEffect(()=>{
        getFeed();
    },[])
    
    if(!feed) return <h1>No more feed</h1>;

    if(feed.length<0) return <h1>No More Users</h1>;
        
    return (
        feed && (
        <>
        <div className="flex justify-center items-center">
            <div className="min-h-screen p-20 flex justify-center items-center">
            <UserCard user={feed[0]}/>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-bold white text-3xl">It Is Yours</h2>
                <div className="m-5">
                <InfoCard user={user}/>
                </div>
            </div>
        </div>
        </>
        )
    )
}

export default Feed;