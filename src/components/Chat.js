import react , {useContext, useState, useEffect} from "react";
import { MessageContext } from "../context/MessageContext"
import ShowMessage from "./ShowMessage"
import { useMutation, useQuery,gql } from "@apollo/client";


//GraphQL
import {CREATE_POST_MUTATION} from "../graphql/Mutation"



const Chat = () => {

    const [message, setMessage] = useContext(MessageContext);
    const [messages, setMessages] = useState([])
    const {name, channelId} = message
    console.log(channelId)


    // Queries Call Load Text
    const LOAD_TEXT = gql`
        query{
            fetchLatestMessages(channelId:"${message.channelId}"){
            text
            datetime
            userId
            }
        }
        `

    

    const { loading, err, data }= useQuery(LOAD_TEXT, {fetchPolicy: "no-cache"})

    useEffect(() => {
        // do some checking here to ensure data exist
        if (data) {
            //console.log(data.MessagesFetchLatest)
          // mutate data if you need to
          setMessages(data)
        }
          
      
      }, [data])
      

    


    //Mutation Call 
    const [pushMessage, {error}] = useMutation(CREATE_POST_MUTATION,{fetchPolicy: "no-cache"})
    
    const AddMessage = (event) => {
        pushMessage({
            variables: {
                channelId: message.channelId,
                text: message.text,
                userId: message.userId
            }
        })
        if(error){
            console.log(error)
        }

        event.preventDefault();
    }


    //Set uer message to change message 
    const setUserText = (event) => {
        const {name, value} = event.target;
        setMessage(prevValue => ({
            ...prevValue,
            [name]: value

        }))
    }


    return(
        <div className="col-sm element">
            <div>
                <h1>Channel : {message.channelId}</h1>
            </div>
            <div className="chatBox">
                <ul className="chatbox-show-result">
                    <li className="chat-left">
                        <button  type="button"  className="btn btn-secondary buttonRead">
                            Read More <i className="fa fa-arrow-up"></i>
                        </button>
                    </li>
                    {/* SPPOUSE TO SHOW ALL THE MESSAGE HERE  */}
                    <ShowMessage data= {messages}/>

                    <li className="chat-left">
                        <button  type="button"  className="btn btn-secondary buttonRead">
                            Read More <i className="fa fa-arrow-up"></i>
                        </button>
                    </li>
                </ul>
                <div className="chat-message">
                    <textarea name="text" value={message.text} onChange={setUserText} cols="30" rows="10" placeholder="Type text here"></textarea>
                    <button onClick={AddMessage} type="button" className="btn btn-primary">
                        Send Message <i className="fa fa-send"></i>
                    </button>

                </div>

            </div>
        
        
        </div>
        
        
    )
}


export default Chat