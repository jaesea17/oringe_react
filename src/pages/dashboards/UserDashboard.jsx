import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accepted from "../../components/Accepted";
import Match from "../../components/Match";
import { states } from "../../components/util/states";
import { baseUrl } from "../../components/util/url";

const UserDashboard = () => {
    
    //DECLARING STATES
    const [formInput, setFormInput] = useState({
        schoolName: "",
        state: "",
        yearFounded: "",
        gameMaster: "",
        gameMasterEmail: "",
        gameMasterPhoneNumber: ""
     })
  
     const [countryStates, setCountryStates] = useState([]);
     const [matches, setMatches] =useState([])
     const [accepted, setAccepted] = useState([]);
     
     //EFFECTS
     useEffect(() => {
        //setting all states in nigeria
        setCountryStates(states);

        //getting the accepted teams from database
        axios.get(`${baseUrl}/participants/accepted`)
        .then((res) => {
            if (res.status === 200) {
                setAccepted(res.data);
            }
        })
        .catch(err => console.log(err))

        //getting all the matches
        axios.get(`${baseUrl}/matches`)
        .then((res) => {
            if (res.status === 200) {
                setMatches(res.data);
            }
        })
        .catch(err => console.log(err))
     },[])

  
     //FUNCTIONS SECTION
     const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormInput({...formInput, [name]: value});
     }

     const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            schoolName: formInput.schoolName,
            state: formInput.state,
            yearFounded: formInput.yearFounded,
            gameMaster: formInput.gameMaster,
            gameMasterEmail: formInput.gameMasterEmail,
            gameMasterPhoneNumber: formInput.gameMasterPhoneNumber
        }
        axios.post(`${baseUrl}/participants`, payload)
        .then((res) => {
            if (res.data.schoolName) return alert("registered successfully");
            if (!res.data.schoolName) return alert("already registered");
            setFormInput({ 
                schoolName: "",
                state: "",
                yearFounded: "",
                gameMaster: "",
                gameMasterEmail: "",
                gameMasterPhoneNumber: ""
            })
        })
        .catch((err) => {
            console.log(err)
        })
     }


    return(
        <div id="main">
           
            <div className="header_div">
               <h1 style={{color: 'blue'}}>sports festival</h1><br></br><br></br>
            </div>

            <div className="admin_div">
                <li style={{listStyle: 'none'}}>
                    <Link to='/admin' style={{textDecoration: 'none'}}>
                        <h3>Admin</h3>
                    </Link>
                </li>
            </div>
           
            <div className="container_div">
                    <div className="form_div pioneer">
                        <h3 style={{color: 'blue', marginBottom: '9px'}}>Register here</h3>
                        <form onSubmit={handleSubmit}>
                            
                            <p>School Name</p>
                            <input type="text" value={formInput.schoolName} 
                                name="schoolName" onChange={handleChange} required />
                            <br></br><br></br>

                            
                            <p>State</p>
                            <select value={formInput.state} name="state" onChange={handleChange} required>
                                {countryStates.map((state) => {
                                return ( <option key={state}>{state}</option> )    
                                })}
                            </select>  
                            <br></br><br></br>

                            
                            <p>Year founded</p>
                            <input type="date" value={formInput.yearFounded}
                                name="yearFounded"onChange={handleChange} required />
                            <br></br><br></br>

                            
                            <p>Game Master</p>
                            <input type="text" value={formInput.gameMaster}
                                name="gameMaster" onChange={handleChange} required />
                            <br></br><br></br>

                            
                            <p>Game Master Email</p>
                            <input type="email" value={formInput.gameMasterEmail}
                                name="gameMasterEmail" onChange={handleChange} required />
                            <br></br><br></br>

                            
                            <p>Game Master Phone number</p>
                            <input type="tel" value={formInput.gameMasterPhoneNumber} 
                                name="gameMasterPhoneNumber" onChange={handleChange}
                                minLength="11" maxLength="11" required />
                            <br></br><br></br>

                            <input type="submit" value="register" />
                        </form>
                    </div>

                    <div className="accepted_div pioneer">
                        <h3 style={{color: 'blue'}}>Accepted Schools</h3>
                        {accepted.map((singleAccepted) => {
                            return(
                                <div key={singleAccepted._id}><br></br>
                                    <Accepted singleAccepted={singleAccepted}/>
                                </div>   
                            )
                        })}    
                    </div>

                    <div className="matches_div pioneer">
                        <h3 style={{color: 'blue'}}>Match schedule</h3>
                        {matches.map((match) => {
                            return(
                                <div key={match._id} style={{marginBottom: '20px'}}>
                                    <Match match={match}/>
                                </div>
                            )
                            
                        })}
                    </div>
            </div>
           
        
        </div>
    )
}
export default UserDashboard