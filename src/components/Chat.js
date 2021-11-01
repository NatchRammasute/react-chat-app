import react , {useContext, useState, useEffect} from "react";
import { MessageContext } from "../context/MessageContext"
import ShowMessage from "./ShowMessage"
import { useMutation, useQuery,gql } from "@apollo/client";
import '../styles/Chat.css';


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
            fetchLatestMessages(channelId:"${channelId}"){
            text
            datetime
            userId
            }
        }
        `

        const fetchMoreMessagebyChannel = gql`
        query MessagesFetchMore($messageId: String!, $old : Boolean!) {
            MessagesFetchMore(
                channelId:"${channelId}",
                messageId : $messageId,
                old:$old
            ){
            messageId,
            text,
            datetime,
                userId
            }
        }
`;
    

    

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


    const { fetchMore } = useQuery(fetchMoreMessagebyChannel, {
        variables: {
            messageId: false ? messages[messages.length-1]?.messageId : messages[0]?.messageId,
            old : false
        }
      });

    const loadMore = async (isOld=true)=>{
        //PushMessage({ variables: { type: input.value } })
        try {
             fetchMore({
                variables: {
                    messageId:  isOld ? messages[messages.length-1]?.messageId : messages[0]?.messageId,
                    old : isOld
                }
              }).then( ({data} )=>{
                
                if(isOld)setMessages([...messages,...data.MessagesFetchMore])
                else setMessages([...data.MessagesFetchMore,...messages])
            }
                )
        }catch{
            return <p>Error :(</p>;
        }
      
    }


    return(
        <div>
            <div>
                <h1 className="channel">Channel : {message.channelId}</h1>
            </div>
            <div className="chatBox">
                <ul className="chatbox-show-result">
                    <li className="chat-left">
                        <button  type="button" onClick={()=>loadMore()} className="btn btn-secondary buttonRead">
                            Read More <i className="fa fa-arrow-up"></i>
                        </button>
                    </li>
                    {/* SPPOUSE TO SHOW ALL THE MESSAGE HERE  */}
                    <ShowMessage data= {messages}/>

                    <li className="chat-left">
                        <button  type="button" onClick={()=>loadMore(false)}  className="btn btn-secondary buttonRead">
                            Read More <i className="fa fa-arrow-up"></i>
                        </button>
                    </li>
                </ul>
                <div className="chat-message">
                    <textarea name="text" value={message.text} onChange={setUserText} cols="30" rows="10" placeholder="Type text here"></textarea>
                    <button onClick={AddMessage} type="button" className="btn btn-primary sender">
                        Send Message <i className="fa fa-send"></i>
                    </button>

                </div>

            </div>
        
        
        </div>
        
        
    )
}


export default Chat