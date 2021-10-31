import react , {useEffect, useState} from "react";
import { MessageContext } from "../context/MessageContext"
import { useQuery, gql } from "@apollo/client";

const ShowMessage = (data,retry=(index)=>{}) => {

    let dataQuery = data.data.fetchLatestMessages
    console.log(dataQuery)
    if (dataQuery != null) {
        console.log("contain")
        console.log(dataQuery)
        let reversed = dataQuery.reverse()
        console.log(reversed)

        return reversed.map(
            (item,index)=>{
                 return (<li  key={`bubble-${item?.error ? "error": ""}-${index}`}>
                        <div className="chat-avatar">
                            {/* <img src={`images/${item.userId}.png`} alt="User"/> */}
                            <div className="chat-name">{item.userId}</div>
                        </div>
                        <div className="chat-text">{item.text}
                        </div>
                        <div className="chat-hour">
                            
                            {item.datetime}
                            {item.error &&
                                <>
                                <button onClick={ ()=>retry(index) }>retry</button>
                                <span className="fa fa-exclamation-circle"></span> <span className="chat-message">Error</span>
                                </>
                            }
    
                        
                        </div>
                    </li>  )
            }
        )
    }else {
        console.log("not working")
        return null
    }
    
    
    

    

}


export default ShowMessage