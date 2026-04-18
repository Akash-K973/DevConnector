import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from './UserCard'
import axios from "axios";
import {addFeed , removeFeed} from "./utils/feedSlice"

const Feed = () =>{
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
        <div>
           <UserCard user={feed[0]}/>
        </div>
        </>
        )
    )
}

export default Feed;