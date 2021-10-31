import react ,{useState, createContext} from "react";


export const MessageContext = createContext();

export const MessageProvider= (props) =>{
    const [message, setMessage] = useState(
        {
            userId: "Joyse",
            channelId:"1",
            text:""
        }
    )
    return (
        <MessageContext.Provider value={[message, setMessage]}>
            {props.children}
        </MessageContext.Provider>

    )
}