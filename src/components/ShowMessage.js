import react , {useEffect} from "react";
import { MessageContext } from "../context/MessageContext"
import {LOAD_TEXT} from "../graphql/Queries"
import { useQuery, gql } from "@apollo/client";

const ShowMessage = () => {

    const {error,loading,data}= useQuery(LOAD_TEXT)

    console.log(data)
    
    
    return(
        <li>test</li>
    )

}


export default ShowMessage