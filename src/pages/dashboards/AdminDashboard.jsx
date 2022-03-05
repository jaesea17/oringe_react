import axios from "axios";
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
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

    const history = useHistory();


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
            <div style={{textAlign: 'right', margin: '17px'}}>
                <button style={{padding: '5px'}} onClick={() => {
                    localStorage.removeItem("auth_token");
                    history.push("/admin/signin")
                    // history.push('/admin/signout');
                }}>signout</button>
            </div>
            <h3 style={{color: 'blue', marginLeft: '17px'}}>Registered Schools</h3>
            <div className="container_div pioneer">
                {participants.map((participant) => {
                    return(
                        <div key={participant._id} style={{margin: '5px'}}>
                            <Participant participant={participant}/>
                        </div>
                    )
                })}

            </div>
            
            <div className="form_div">
                <h3 style={{color: 'blue', marginBottom: '7px'}}>Schedule match</h3>
                <form onSubmit={handleSubmit}>  
                    <p>Home</p>
                    <input type="text"
                    name="home"
                    value={matchDetails.home}
                    onChange={handleChange}
                    required
                    />
                    <br></br><br></br>
                    
                    
                    <p>Away</p>
                    <input type="text"
                    name="away"
                    value={matchDetails.away}
                    onChange={handleChange}
                    required
                    />
                    <br></br><br></br>
                    
                    
                    <p>Date</p>
                    <input type="date"
                    name="date"
                    value={matchDetails.date}
                    onChange={handleChange}
                    required
                    />
                    <br></br><br></br>
                    
                    
                    <p>Time</p>
                    <input type="time"
                    name="time"
                    value={matchDetails.time}
                    onChange={handleChange}
                    required
                    />
                    <br></br><br></br>

                    <input type="submit" value="Schedule"/>
                </form>
            </div>
        </div>
    )
}
export default AdminDashboard