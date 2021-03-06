import {gql} from "@apollo/client"

export const CREATE_POST_MUTATION = gql`
mutation postMessage(
    $channelId: String! 
    $text: String! 
    $userId: String!){
        postMessage(
            channelId:$channelId 
            text: $text 
            userId: $userId)
            { messageId text, datetime, userId
            }}
`