import axios from "axios";
import { useEffect, useState } from "react";
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
               <h1>sports festival</h1><br></br><br></br>
               <h4>NB: add '/admin' in the url to navigate to a protected admin dashboard</h4>
           </div>

           
           <div className="container_div">
                <div className="form_div pioneer">
                    <h3>Register here</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            School Name:
                            <input type="text" value={formInput.schoolName} 
                                name="schoolName" onChange={handleChange} required />
                        </label><br></br><br></br>

                        <label>
                            State:
                            <select value={formInput.state} name="state" onChange={handleChange} required>
                                {countryStates.map((state) => {
                                return ( <option key={state}>{state}</option> )    
                                })}
                            </select>  
                        </label><br></br><br></br>

                        <label>
                            Year founded:
                            <input type="date" value={formInput.yearFounded}
                                name="yearFounded"onChange={handleChange} required />
                        </label><br></br><br></br>

                        <label>
                            Game Master:
                            <input type="text" value={formInput.gameMaster}
                                name="gameMaster" onChange={handleChange} required />
                        </label><br></br><br></br>

                        <label>
                            Game Master Email:
                            <input type="email" value={formInput.gameMasterEmail}
                                name="gameMasterEmail" onChange={handleChange} required />
                        </label><br></br><br></br>

                        <label>
                            Game Master Phone number:
                            <input type="tel" value={formInput.gameMasterPhoneNumber} 
                                name="gameMasterPhoneNumber" onChange={handleChange}
                                minLength="11" maxLength="11" required />
                        </label><br></br><br></br>

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
                            <div key={match._id}>
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