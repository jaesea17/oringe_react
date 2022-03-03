import axios from "axios";
import React, { useEffect, useState } from "react"
import Participant from "../../components/Participant";
import { baseUrl } from "../../components/util/url";

const AdminDashboard = () => {
    //DECLARING STATES
    const [participants, setParticipants] = useState([]);

    const [matchDetails, setMatchDetails] = useState({
        home: "",
        away: "",
        date: "",
        time: ""
    })


    //EFFECTS
    useEffect(() => {
        axios.get(`${baseUrl}/participants`)
        .then((res) => {
            if (res.status === 200){
                setParticipants(res.data)
            }
        })
        .catch(err => console.log(err))
    }, [])


    //FUNCTIONS AREA
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMatchDetails({...matchDetails, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            home: matchDetails.home,
            away: matchDetails.away,
            date: matchDetails.date,
            time: matchDetails.time
        }
        axios.post(`${baseUrl}/matches`, payload)
        .then((res) => {
            if (res.status === 200) return alert("match scheduled")
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h3>Registered Schools</h3>
            <div className="container_div pioneer">
                {participants.map((participant) => {
                    return(
                        <div key={participant._id}>
                            <Participant participant={participant}/>
                        </div>
                    )
                })}

            </div>
            
            <div className="schedule pioneer">
                <h3>Schedule match</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Home:
                        <input type="text"
                        name="home"
                        value={matchDetails.home}
                        onChange={handleChange}
                        required
                        />
                    </label><br></br><br></br>
                    
                    <label>
                        Away:
                        <input type="text"
                        name="away"
                        value={matchDetails.away}
                        onChange={handleChange}
                        required
                    />
                    </label><br></br><br></br>
                    
                    <label>
                        Date:
                        <input type="date"
                        name="date"
                        value={matchDetails.date}
                        onChange={handleChange}
                        required
                        />
                    </label><br></br><br></br>
                    
                    <label>
                        Time:
                        <input type="time"
                        name="time"
                        value={matchDetails.time}
                        onChange={handleChange}
                        required
                        />
                    </label><br></br><br></br>

                    <input type="submit" value="Schedule"/>
                </form>
            </div>
        </div>
    )
}
export default AdminDashboard