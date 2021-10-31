/* eslint-disable no-useless-computed-key */
/* eslint-disable eqeqeq */
import react , {useContext} from "react";
import { MessageContext } from "../context/MessageContext"
import '../styles/SideBar.css';


const SideBar = () => {
    const [message, setMessage] = useContext(MessageContext);

    //change userID to match what user choose 
    const setUserChoose = (event) => {
        const {name, value} = event.target;
        setMessage(prevValue => ({
            ...prevValue,
            [name]: value

        }))
    }

    //Change User Channel base on what user choose 
    const setChannelChoose = (event) => {
        const channel = event.target.innerText;
        console.log(channel)
        if(channel == "General"){
            updateMessage("1")
        }else if(channel == "Techology"){
            updateMessage("2")
        }else if(channel == "LGBTM"){
            updateMessage("3")
        }   
    }

    // update channelID 
    const updateMessage = (ele) =>{
        setMessage(prevValue => ({
            ...prevValue,
            ['channelId']: ele

        }))
    }




    return(
        <div className="Sidebar">
            <div className="user-container">
                <div className="user-select-name">
                    <label>1. Choose your user</label>
                    <select name="userId" id="userId" value={message.userId} onChange={setUserChoose}>
                        <option value="Joyse">Joyse</option>
                        <option value="Sam">Sam</option>
                        <option value="Russell">Russell</option>
                    </select>
                </div>
                <div className="user-select-channel">
                    <p>2. Choose Your Channel </p>
                    <ul>
                        <li><span onClick={setChannelChoose}>General</span></li>
                        <li><span onClick={setChannelChoose}>Techology</span></li>
                        <li><span onClick={setChannelChoose}>LGBTM</span></li>
                    </ul>
                </div>
            </div>

        </div>
    )


}




export default SideBar