import axios from "axios"
import React, { useState } from "react"
import { baseUrl } from "./util/url"

const Participant = ({participant}) => {
    const [accepted, setAccepted] = useState();

    const accept = () => {
        const payload = {accepted: true, id: participant._id};
        axios.patch(`${baseUrl}/participants`, payload)
        .then((res) => {
              
        })
        .catch(err => console.log(err))
        setAccepted(true)
    }

    return(
        <div className="participant_div"><br></br>
            <input type="text" value={participant.schoolName} readOnly={true} /><br></br>
            <input type="text" value={participant.state} readOnly={true} /><br></br>
            <input type="text" value={participant.yearFounded} readOnly={true} /><br></br>
            <input type="text" value={participant.gameMaster} readOnly={true} /><br></br>
            <input type="text" value={participant.gameMasterEmail} readOnly={true} /><br></br>
            <input type="text" value={participant.gameMasterPhoneNumber} readOnly={true} /><br></br>
            {accepted && <div>ACCEPTED</div>}
            <input type="button" value="Accept" onClick={accept}/>
        </div>
    )
}
export default Participant