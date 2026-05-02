import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "./utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";


const Chat = () => {
    const {targetUserId} = useParams();
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState(" ");
    const user = useSelector((store)=>store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        const chat = await axios.get("http://localhost:3000/chat/"+targetUserId,{
            withCredentials:true
        })
        

        const chatMessages = chat?.data?.messages.map(msg =>{
            const {senderId,text} = msg
            return {firstName:senderId?.firstName,lastName:senderId?.lastName,text}
        })
        setMessages(chatMessages)
    }

    useEffect(()=>{
        fetchChatMessages();
    },[])

    useEffect(()=>{
        if(!userId){
            return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat",{firstName:user.firstName,userId,targetUserId});

        socket.on("messageReceived",({firstName,text})=>{
            setMessages((messages)=>[...messages,{firstName,text}]);
        })

        return () => {
            socket.disconnect();
        };
    },[userId,targetUserId])

    const sendMessage = () =>{
        const socket = createSocketConnection();
        socket.emit("sendMessage",{
            firstName:user.firstName,
            userId,
            targetUserId,
            text:newMessage,
        })
        setNewMessage(" ");
    }

    return (
        <div className="min-h-screen">
        <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                {messages.map((msg,index)=>{
                    return(<>
                        <div key={index} className="chat-header">{msg.firstName}
                           
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50"></div>
                        </>
                    )
                })}
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input
                id="123"
                value={newMessage}
                className="input flex-1 border border-gray-500 text-white rounded p-2"
                onChange={(e)=>setNewMessage(e.target.value)}/>
                <button onClick={sendMessage} className="send-chat-btn btn btn-primary">Send</button>
            </div>
        </div>
        </div>
    )
}

export default Chat;