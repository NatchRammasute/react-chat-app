import react , {useContext} from "react";
import { MessageContext } from "../context/MessageContext"

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



    return(
        <div className="Sidebar">
            <div className="user-container">
                <div className="user-selct-name">
                    <label>1. Choose your user</label>
                    <select name="userId" id="userId" value={message.userId} onChange={setUserChoose}>
                        <option value="Joyse">Joyse</option>
                        <option value="Sam">Sam</option>
                        <option value="Russell">Russell</option>
                    </select>

                </div>
            </div>

        </div>
    )


}




export default SideBar