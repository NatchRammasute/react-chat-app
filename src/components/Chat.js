import react , {useContext, useState} from "react";
import { MessageContext } from "../context/MessageContext"


const Chat = () => {

    const [message, setMessage] = useContext(MessageContext);


    return(
        <div>
            <h1>Channel : {message.channelId}</h1>
        </div>
        
    )
}


export default Chat