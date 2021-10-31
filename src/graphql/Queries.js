import {gql} from "@apollo/client"

export const LOAD_TEXT = gql`
query{
    fetchLatestMessages(channelId:"1"){
      text
    }
  }
 `