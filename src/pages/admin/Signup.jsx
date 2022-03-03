import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { baseUrl } from "../../components/util/url";

const Signup = () => {
    const [inputs, setInputs] = useState({fullName: "", email: "", adminId: "", password: ""});
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const{ fullName, email, adminId, password } = inputs;
        const payload = {
            "fullName": fullName, "email": email,
             "adminId": adminId, "password": password        
        }
        axios.patch(`${baseUrl}/admin/signup`, payload)
        .then((res)=>{
            if(res.data !== 'not an admin'){
                history.push("signin");
            }else{ alert('you are not an admin')} 
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value})
    }

    return(
        <>
            <div className="header_div">
                <h3>all admins must have a pre-issued admin id!</h3>
                <form onSubmit={handleSubmit}>
                    <label>full Name:
                        <input
                        data-testid="firstName-input"
                        type="text"
                        name="fullName"
                        value={inputs.fullName || ""}                    
                        onChange={handleChange}
                        />
                    </label><br></br><br></br>
            
                    <label>Email:
                        <input
                        type="email" 
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                        />
                    </label><br></br><br></br>

                    <label>Admin id:
                        <input
                        type="text" 
                        name="adminId"
                        value={inputs.adminId || ""}
                        onChange={handleChange}
                        />
                    </label><br></br><br></br>
                    
                    <label>Password:
                        <input
                        type="password" 
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                        />
                    </label>
                    <li style={{listStyle: "none"}}>(Password must be atleast 6 characters long)</li>

                    <input type="submit" value="signup"/>
                </form>
                <p>Already an Admin ?<Link to="signin">signin</Link></p>
            </div>
        </>
    )
};
export default Signup