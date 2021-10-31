import {gql} from "@apollo/client"
import { MessageContext } from "../context/MessageContext"


export const LOAD_TEXT = gql`
query{
    fetchLatestMessages(channelId:"2"){
      text
      datetime
      userId
    }
  }
 `